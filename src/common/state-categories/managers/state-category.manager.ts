import { GenericManager } from '@shared/';
import { StateCategory } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class StateCategoryManager extends GenericManager<StateCategory> {
  protected readonly wildcards = ['common/state_category/**/*.txt'];

  make(id: StateCategory['id']): StateCategory {
    return new StateCategory(this.product, id);
  }

  protected async processFile({ path }): Promise<StateCategory[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(
      data['state_categories'],
    ).map(([id, data]) =>
      plainToClassFromExist(this.make(id), data, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
