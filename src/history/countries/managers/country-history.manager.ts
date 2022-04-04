import { GenericManager } from '@shared/';
import { Autonomy, CountryHistory, DiplomaticRelation } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { x } from '../../../interface';

export class CountryHistoryManager extends GenericManager<CountryHistory> {
  protected readonly wildcards = ['history/countries/**/*.txt'];

  make(): CountryHistory {
    return new CountryHistory(this.product);
  }

  async get(countryTag: string) {
    const [history = null] = await this.load({
      wildcards: [`history/countries/**/${countryTag}*.txt`],
    });
    return history;
  }

  protected async processFile({ path }): Promise<CountryHistory[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    const countryHistory = plainToClassFromExist(this.make(), data, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
    const countryPolitics = plainToClassFromExist(
      countryHistory.makePolitics(),
      data['set_politics'],
      {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      },
    );
    countryHistory.setPolitics(countryPolitics);
    const diplomaticRelations = x(data['diplomatic_relation']).map((data) =>
      plainToClassFromExist(new DiplomaticRelation(this.product), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
    countryHistory.addDiplomaticRelation(...diplomaticRelations);
    const autonomies = x(data['set_autonomy']).map((data) =>
      plainToClassFromExist(new Autonomy(this.product, countryHistory), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
    countryHistory.addAutonomy(...autonomies);
    return [countryHistory];
  }
}
