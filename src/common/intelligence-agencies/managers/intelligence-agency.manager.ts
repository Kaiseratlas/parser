import { convertToArray, GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { IntelligenceAgency as IA } from '../classes/intelligence-agency.class';

export class IntelligenceAgencyManager extends GenericManager<IA> {
  protected readonly wildcards = ['common/intelligence_agencies/**/*.txt'];

  make(): IA {
    return new IA(this.product);
  }

  async load(o?): Promise<IA[]> {
    return super.load({ ...o, nocache: true });
  }

  async get(id: IA['id'], o?): Promise<IA> {
    return super.get(id, { ...o, nocache: true });
  }

  protected updateCache() {}

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return convertToArray(data[IA.Key]).map((data) =>
      plainToClassFromExist(this.make(), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
  }
}
