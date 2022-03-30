import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToInstance } from 'class-transformer';
import { IntelligenceAgency as IA } from '../classes/intelligence-agency.class';

export class IntelligenceAgencyManager extends GenericManager<IA> {
  protected readonly wildcards = ['common/intelligence_agencies/**/*.txt'];

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    const agencies = plainToInstance(IA, data['intelligence_agency'], {
      excludeExtraneousValues: true,
    });
    return agencies as unknown as any[];
  }
}
