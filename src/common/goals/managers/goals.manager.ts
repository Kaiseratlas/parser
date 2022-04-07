import { Focus, FocusTree } from '../classes';
import { convertToArray, GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { tryToFixFile } from '@shared/';

export class GoalsManager extends GenericManager<FocusTree> {
  protected readonly wildcards = ['common/national_focus/**/*.txt'];

  make(): FocusTree {
    return new FocusTree(this.product);
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
      const focuses = convertToArray(data[Focus.Key]).map((data) => {
        return plainToClassFromExist(new Focus(this.product, tree), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        });
      });
      tree.addFocus(...focuses);
      return plainToClassFromExist(tree, data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });
    });
  }
}
