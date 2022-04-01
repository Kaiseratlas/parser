import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { IntelligenceAgency as IA } from '../classes/intelligence-agency.class';
import { x } from '../../../interface';

export class IntelligenceAgencyManager extends GenericManager<IA> {
  protected readonly wildcards = ['common/intelligence_agencies/**/*.txt'];

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return x(data['intelligence_agency']).map((data) =>
      plainToClassFromExist(new IA(this.product), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
  }
}
