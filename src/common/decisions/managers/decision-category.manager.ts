import { GenericManager } from '@shared/';
import { DecisionCategory } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class DecisionCategoryManager extends GenericManager<DecisionCategory> {
  protected readonly wildcards = ['common/decisions/categories/**/*.txt'];

  make(id: DecisionCategory['id']): DecisionCategory {
    return new DecisionCategory(this.product, id);
  }

  protected async processFile({ path }): Promise<DecisionCategory[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data).map(([id, data]) =>
      plainToClassFromExist(this.make(id), data, {
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
      }),
    );
  }
}
