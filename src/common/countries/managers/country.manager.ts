import { Country } from '../classes/country.class';
import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';

type CountryTag = string;

export class CountryManager extends GenericManager {
  protected readonly wildcards = ['common/country_tags/**/*.txt'];

  get(tag: CountryTag) {
    return new Country();
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    console.log('data', data);
    return [];
  }
}
