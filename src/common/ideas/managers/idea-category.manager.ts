import { GenericManager } from '@shared/';
import { IdeaCategory } from '../classes/idea-category.class';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class IdeaCategoryManager extends GenericManager<IdeaCategory> {
  protected readonly wildcards = ['common/idea_tags/**/*.txt'];

  async get(id: IdeaCategory['id']) {
    const ideaCategories = await this.load();
    return ideaCategories.find((ic) => ic.id === id);
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['idea_categories']).map(
      ([id, data]) =>
        plainToClassFromExist(
          new IdeaCategory(this.product),
          { id, ...data },
          {
            excludeExtraneousValues: true,
            exposeDefaultValues: true,
          },
        ),
    );
  }
}
