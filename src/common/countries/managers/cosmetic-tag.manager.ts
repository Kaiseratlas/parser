import { GenericManager } from '@shared/';
import { CosmeticTag } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class CosmeticTagManager extends GenericManager<CosmeticTag> {
  protected readonly wildcards = ['common/countries/cosmetic.txt'];

  make(cosmeticTag: CosmeticTag['tag']): CosmeticTag {
    return new CosmeticTag(this.product, cosmeticTag);
  }

  protected updateCache(entities: CosmeticTag[]) {
    entities.forEach((entity) => this.cache.set(entity.tag, entity));
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data).map(([cosmeticTag, data]) =>
      plainToClassFromExist(this.make(cosmeticTag), data, {
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
      }),
    );
  }
}
