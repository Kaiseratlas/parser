import { Country, CountryColor } from '../classes';
import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class CountryColorManager extends GenericManager<CountryColor> {
  protected readonly wildcards = ['common/countries/colors.txt'];

  make(countryTag: CountryColor['tag']): CountryColor {
    return new CountryColor(this.product, countryTag);
  }

  protected updateCache(entities: CountryColor[]) {
    entities.forEach((entity) => this.cache.set(entity.tag, entity));
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data).map(([countryTag, data]) =>
      plainToClassFromExist(this.make(countryTag), data, {
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
      }),
    );
  }
}
