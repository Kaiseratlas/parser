import { Country } from '../classes';
import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { CountryColorManager } from './country-color.manager';

export class CountryManager extends GenericManager<Country> {
  protected readonly wildcards = ['common/country_tags/**/*.txt'];

  make(countryTag: Country['tag'], isDynamic: Country['isDynamic']): Country {
    return new Country(this.product, countryTag, isDynamic);
  }

  protected updateCache(entities: Country[]) {
    entities.forEach((entity) => this.cache.set(entity.tag, entity));
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
      return this.make(countryTag, dynamicTags);
    });
  }
}
