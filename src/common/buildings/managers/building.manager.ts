import { GenericManager } from '@shared/';
import { Building } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class BuildingManager extends GenericManager<Building> {
  protected readonly wildcards = ['common/buildings/**/*.txt'];

  make(id: Building['id']): Building {
    return new Building(this.product, id);
  }

  protected async processFile({ path }): Promise<Building[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data['buildings']).map(([id, data]) =>
      plainToClassFromExist(this.make(id), data, {
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
      }),
    );
  }
}
