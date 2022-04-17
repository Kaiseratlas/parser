import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { Terrain } from '../classes';
import { TerrainCategoryManager } from './terrain-category.manager';

export class TerrainManager extends GenericManager<Terrain> {
  protected readonly wildcards = ['common/terrain/**/*.txt'];

  readonly categories = new TerrainCategoryManager(this.product);

  make(id: Terrain['id']): Terrain {
    return new Terrain(this.product, id);
  }

  protected async processFile({ path }): Promise<Terrain[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['terrain']).map(
      ([id, data]) =>
        plainToClassFromExist(this.make(id), data, {
          exposeDefaultValues: true,
          excludeExtraneousValues: true,
        }),
    );
  }
}
