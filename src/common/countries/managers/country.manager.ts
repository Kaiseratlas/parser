import { Country } from '../classes';
import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { CountryColorManager } from './country-color.manager';

export class CountryManager extends GenericManager<Country> {
  protected readonly wildcards = ['common/country_tags/**/*.txt'];

  async get(tag: Country['tag']) {
    const countries = await this.load();
    return countries.find((country) => country.tag === tag);
  }

  readonly colors = new CountryColorManager(this.product);

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    let dynamicTags = false;
    return Object.entries(data).map(([countryTag, data]) => {
      if (countryTag === 'dynamic_tags' && data === true) {
        dynamicTags = true;
      }
      return new Country(this.product, countryTag, dynamicTags);
    });
  }
}
