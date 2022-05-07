import {
  Focus,
  FocusTree,
  FocusTreeCountryModifier as Modifier,
  FocusTreeCountry,
} from '../classes';
import { convertToArray, GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { tryToFixFile } from '@shared/';

export class FocusTreeManager extends GenericManager<FocusTree> {
  protected readonly wildcards = ['common/national_focus/**/*.txt'];

  make(): FocusTree {
    return new FocusTree(this.product);
  }

  protected serializeFocus(data: unknown, tree: FocusTree): Focus {
    return plainToClassFromExist(new Focus(this.product, tree), data, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }

  protected async processFile({ path }): Promise<FocusTree[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    let data;
    try {
      data = parser.parseText(out);
    } catch (e) {
      data = parser.parseText(tryToFixFile(out));
    }
    return convertToArray(data[FocusTree.Key]).map((data) => {
      const tree = this.make();
      const countries = convertToArray(data['country']).map((data) => {
        const country = new FocusTreeCountry(this.product, tree);
        const modifiers = convertToArray(data['modifier']).map((data) =>
          plainToClassFromExist(new Modifier(this.product, country), data, {
            excludeExtraneousValues: true,
            exposeDefaultValues: true,
          }),
        );
        country.addModifier(...modifiers);
        return plainToClassFromExist(country, data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        });
      });
      tree.addCountry(...countries);
      const focuses = convertToArray(data[Focus.Key]).map((data) =>
        this.serializeFocus(data, tree),
      );
      tree.addFocus(...focuses);
      return plainToClassFromExist(tree, data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });
    });
  }
}
