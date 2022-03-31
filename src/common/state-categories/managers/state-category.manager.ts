import { GenericManager } from '@shared/';
import { StateCategory } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class StateCategoryManager extends GenericManager<StateCategory> {
  protected readonly wildcards = ['common/state_category/**/*.txt'];

  async get(id: StateCategory['id']) {
    const stateCategories = await this.load();
    return stateCategories.find((sc) => sc.id === id);
  }

  protected async processFile({ path }): Promise<StateCategory[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data['state_categories']).map(([id, data]: any) =>
      plainToClassFromExist(
        new StateCategory(this.product),
        { id, ...data },
        {
          excludeExtraneousValues: true,
        },
      ),
    );
  }
}
