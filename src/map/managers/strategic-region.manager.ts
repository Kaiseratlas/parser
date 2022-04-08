import { GenericManager } from '@shared/';
import { StrategicRegion } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { convertToArray } from '@shared/';
import { plainToClassFromExist } from 'class-transformer';

export class StrategicRegionManager extends GenericManager<StrategicRegion> {
  protected readonly wildcards = ['map/strategicregions/**/*.txt'];

  make(): StrategicRegion {
    return new StrategicRegion(this.product);
  }

  protected async processFile({ path }): Promise<StrategicRegion[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return convertToArray(data[StrategicRegion.Key]).map((data) =>
      plainToClassFromExist(this.make(), data, {
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
      }),
    );
  }
}
