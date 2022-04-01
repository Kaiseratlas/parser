import { GenericManager } from '@shared/';
import { NameBase } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class NameManager extends GenericManager<NameBase> {
  protected readonly wildcards = ['common/names/**/*.txt'];

  async get(countryTag: string) {
    const nameBases = await this.load();
    return nameBases.find((nameBase) => nameBase.countryTag === countryTag);
  }

  protected async processFile({ path }): Promise<NameBase[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data).map(([countryTag, data]) =>
      plainToClassFromExist(new NameBase(this.product, countryTag), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
  }
}
