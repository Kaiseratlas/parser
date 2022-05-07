import { GenericManager } from '@shared/';
import { OccupationLaw } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class OccupationLawManager extends GenericManager<OccupationLaw> {
  protected readonly wildcards = ['common/resources/*_resources.txt'];

  make(id: OccupationLaw['id']): OccupationLaw {
    return new OccupationLaw(this.product, id);
  }

  protected async processFile({ path }): Promise<OccupationLaw[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data).map(([id, data]) =>
      plainToClassFromExist(this.make(id), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
  }
}
