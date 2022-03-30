import { GenericManager } from '../../../shared/managers/generic.manager';
import { CountryHistory } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist, plainToInstance } from 'class-transformer';
import { CountryPolitics } from '../classes/country-politics.class';

export class CountryHistoryManager extends GenericManager<CountryHistory> {
  protected readonly wildcards = ['history/countries/**/*.txt'];

  async get(countryTag: string) {
    const [history = null] = await this.load({
      wildcards: [`history/countries/**/${countryTag}*.txt`],
    });
    return history;
  }

  protected async processFile({ path }): Promise<CountryHistory[]> {
    //console.log('path', path);
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    const countryHistory = plainToClassFromExist(
      new CountryHistory(this.product),
      data,
      {
        excludeExtraneousValues: true,
      },
    );
    const countryPolitics = plainToInstance(
      CountryPolitics,
      data['set_politics'],
      {
        excludeExtraneousValues: true,
      },
    );
    countryHistory.setPolitics(countryPolitics);
    return [countryHistory];
  }
}
