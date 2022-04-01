import { Country, CountryColor } from '../classes';
import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class CountryColorManager extends GenericManager<CountryColor> {
  protected readonly wildcards = ['common/countries/colors.txt'];

  async get(tag: Country['tag']) {
    const countries = await this.load();
    return countries.find((country) => country.tag === tag);
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data).map(([countryTag, data]) =>
      plainToClassFromExist(new CountryColor(this.product, countryTag), data, {
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
      }),
    );
  }
}
