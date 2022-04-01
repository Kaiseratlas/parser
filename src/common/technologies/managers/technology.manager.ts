import { GenericManager } from '@shared/';
import { Technology } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class TechnologyManager extends GenericManager<Technology> {
  protected readonly wildcards = ['common/technologies/**/*.txt'];

  protected async processFile({ path }): Promise<Technology[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['technologies']).map(
      ([id, data]) =>
        plainToClassFromExist(
          new Technology(this.product, id),
          { id, ...data },
          {
            exposeDefaultValues: true,
            excludeExtraneousValues: true,
          },
        ),
    );
  }
}
