import { GenericManager } from '@shared/';
import { TechnologySharingGroup } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { x } from '../../../interface';

export class TechnologySharingGroupManager extends GenericManager<TechnologySharingGroup> {
  protected readonly wildcards = ['common/technology_sharing/**/*.txt'];

  make(): TechnologySharingGroup {
    return new TechnologySharingGroup(this.product);
  }

  protected async processFile({ path }): Promise<TechnologySharingGroup[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return x(data['technology_sharing_group']).map((data) =>
      plainToClassFromExist(this.make(), data, {
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
      }),
    );
  }
}
