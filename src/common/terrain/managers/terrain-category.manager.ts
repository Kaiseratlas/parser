import { GenericManager } from '@shared/';
import { TerrainCategory } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class TerrainCategoryManager extends GenericManager<TerrainCategory> {
  protected readonly wildcards = ['common/terrain/**/*.txt'];

  make(id: TerrainCategory['id']): TerrainCategory {
    return new TerrainCategory(this.product, id);
  }

  protected async processFile({ path }): Promise<TerrainCategory[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['categories']).map(
      ([id, data]) =>
        plainToClassFromExist(this.make(id), data, {
          exposeDefaultValues: true,
          excludeExtraneousValues: true,
        }),
    );
  }
}
