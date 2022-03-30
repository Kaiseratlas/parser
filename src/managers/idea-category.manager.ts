import { GenericManager } from './generic.manager';
import { IdeaCategory } from '../classes/idea-category.class';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToInstance } from 'class-transformer';

export class IdeaCategoryManager extends GenericManager<IdeaCategory> {
  protected readonly wildcards = ['common/idea_tags/**/*.txt'];

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return [
      plainToInstance(IdeaCategory, data['idea_categories'], {
        excludeExtraneousValues: true,
      }),
    ];
  }
}
