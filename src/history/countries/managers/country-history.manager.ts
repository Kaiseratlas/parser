import { convertToArray, GenericManager } from '@shared/';
import { Autonomy, CountryHistory, DiplomaticRelation } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import path from 'path';

export class CountryHistoryManager extends GenericManager<CountryHistory> {
  protected readonly wildcards = ['history/countries/**/*.txt'];

  make(tag: CountryHistory['tag']): CountryHistory {
    return new CountryHistory(this.product, tag);
  }

  protected updateCache(entities: CountryHistory[]) {
    entities.forEach((countryHistory) => {
      this.cache.set(countryHistory.tag, countryHistory);
      // duplicate for cosmetic tags
      if (!this.cache.has(countryHistory.currentTag)) {
        this.cache.set(countryHistory.currentTag, countryHistory);
      }
    });
  }

  protected async processFile({ path: fullPath }): Promise<CountryHistory[]> {
    const out = await fs.promises.readFile(fullPath);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    const [tag] = path.parse(fullPath).name.match(/^\S{3}/);
    const countryHistory = plainToClassFromExist(this.make(tag), data, {
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
    const diplomaticRelations = convertToArray(data['diplomatic_relation']).map(
      (data) =>
        plainToClassFromExist(new DiplomaticRelation(this.product), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        }),
    );
    countryHistory.addDiplomaticRelation(...diplomaticRelations);
    const autonomies = convertToArray(data['set_autonomy']).map((data) =>
      plainToClassFromExist(new Autonomy(this.product, countryHistory), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
    countryHistory.addAutonomy(...autonomies);
    return [countryHistory];
  }
}
