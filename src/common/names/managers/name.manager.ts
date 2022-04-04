import { GenericManager } from '@shared/';
import { NameBase } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class NameManager extends GenericManager<NameBase> {
  protected readonly wildcards = ['common/names/**/*.txt'];

  make(countryTag: NameBase['countryTag']): NameBase {
    return new NameBase(this.product, countryTag);
  }

  protected updateCache(entities: NameBase[]) {
    entities.forEach((entity) => this.cache.set(entity.countryTag, entity));
  }

  protected async processFile({ path }): Promise<NameBase[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data).map(([countryTag, data]) =>
      plainToClassFromExist(this.make(countryTag), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
  }
}
