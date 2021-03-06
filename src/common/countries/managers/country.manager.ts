import { Country } from '../classes';
import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { CountryColorManager } from './country-color.manager';
import { CosmeticTagManager } from './cosmetic-tag.manager';
import { CountryFlagManager } from './country-flag.manager';

export class CountryManager extends GenericManager<Country> {
  protected readonly wildcards = ['common/country_tags/**/*.txt'];

  make(countryTag: Country['tag'], isDynamic: Country['isDynamic']): Country {
    return new Country(this.product, countryTag, isDynamic);
  }

  async get(tag: Country['tag']) {
    const country = await super.get(tag);
    if (country) {
      return country;
    }
    const countryHistory = await this.product.history.countries.get(tag);
    return super.get(countryHistory.tag);
  }

  protected updateCache(entities: Country[]) {
    entities.forEach((entity) => this.cache.set(entity.tag, entity));
  }

  readonly cosmeticTags = new CosmeticTagManager(this.product);
  readonly colors = new CountryColorManager(this.product);
  readonly flags = new CountryFlagManager(this.product);

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
