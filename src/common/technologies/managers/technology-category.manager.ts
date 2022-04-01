import { GenericManager } from '@shared/';
import { TechnologyCategory } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';

export class TechnologyCategoryManager extends GenericManager<TechnologyCategory> {
  protected readonly wildcards = ['common/technology_tags/**/*.txt'];

  async get(id: TechnologyCategory['id']) {
    const technologyCategories = await this.load();
    return technologyCategories.map(
      (technologyCategory) => technologyCategory.id === id,
    );
  }

  protected async processFile({ path }): Promise<TechnologyCategory[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.keys(data['technology_categories']).map(
      (id) => new TechnologyCategory(this.product, id),
    );
  }
}
