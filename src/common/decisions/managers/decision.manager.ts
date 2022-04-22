import { GenericManager, tryToFixFile } from '@shared/';
import { Decision } from '../classes';
import type { DecisionCategory } from '../classes';
import { DecisionCategoryManager } from './decision-category.manager';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class DecisionManager extends GenericManager<Decision> {
  protected readonly wildcards = ['common/decisions/**/*.txt'];

  readonly categories = new DecisionCategoryManager(this.product);

  make(categoryId: DecisionCategory['id'], id: Decision['id']): Decision {
    return new Decision(this.product, categoryId, id);
  }

  protected async processFile({ path }): Promise<Decision[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    let data: unknown;
    try {
      data = parser.parseText(out);
    } catch (e) {
      data = parser.parseText(tryToFixFile(out));
    }
    return Object.entries(data)
      .map(([categoryId, data]) =>
        Object.entries(data).map(([id, data]) =>
          plainToClassFromExist(this.make(categoryId, id), data, {
            exposeDefaultValues: true,
            excludeExtraneousValues: true,
          }),
        ),
      )
      .flat();
  }
}
