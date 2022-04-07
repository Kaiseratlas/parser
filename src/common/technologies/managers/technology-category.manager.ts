import { GenericManager } from '@shared/';
import { TechnologyCategory } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';

export class TechnologyCategoryManager extends GenericManager<TechnologyCategory> {
  protected readonly wildcards = ['common/technology_tags/**/*.txt'];

  make(id: TechnologyCategory['id']): TechnologyCategory {
    return new TechnologyCategory(this.product, id);
  }

  protected async processFile({ path }): Promise<TechnologyCategory[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.values<string>(data['technology_categories']).map((id) =>
      this.make(id),
    );
  }
}
