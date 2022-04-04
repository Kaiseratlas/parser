import { GenericManager } from '@shared/';
import { Technology } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { TechnologyCategoryManager } from './technology-category.manager';
import { TechnologySharingGroupManager } from './technology-sharing-group.manager';

export class TechnologyManager extends GenericManager<Technology> {
  protected readonly wildcards = ['common/technologies/**/*.txt'];
  readonly categories = new TechnologyCategoryManager(this.product);
  readonly sharingGroups = new TechnologySharingGroupManager(this.product);

  make(id: Technology['id']): Technology {
    return new Technology(this.product, id);
  }

  protected async processFile({ path }): Promise<Technology[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['technologies']).map(
      ([id, data]) =>
        plainToClassFromExist(this.make(id), data, {
          exposeDefaultValues: true,
          excludeExtraneousValues: true,
        }),
    );
  }
}
