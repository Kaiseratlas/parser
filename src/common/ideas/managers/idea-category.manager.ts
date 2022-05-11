import { GenericManager } from '@shared/';
import type { IdeaCategory } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { Idea } from '../classes';

export class IdeaCategoryManager extends GenericManager<IdeaCategory> {
  protected readonly wildcards = ['common/idea_tags/**/*.txt'];

  make(id: IdeaCategory['id']): IdeaCategory {
    return new Idea.Category(this.product, id);
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['idea_categories']).map(
      ([id, data]) =>
        plainToClassFromExist(this.make(id), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        }),
    );
  }
}
