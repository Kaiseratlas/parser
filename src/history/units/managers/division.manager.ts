import { convertToArray, GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { Division } from '../classes';
import { plainToClassFromExist } from 'class-transformer';
import { DivisionTemplateManager } from './division-template.manager';
import path from 'path';

export class DivisionManager extends GenericManager<Division> {
  protected readonly wildcards = ['history/units/**/*.txt'];

  readonly templates = new DivisionTemplateManager(this.product);

  make(oob: Division['OOB']): Division {
    return new Division(this.product, oob);
  }

  protected async processFile({ path: fullPath }): Promise<Division[]> {
    const oob = path.parse(fullPath).name;
    const out = await fs.promises.readFile(fullPath);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return convertToArray(data['units'])
      .map((data) =>
        convertToArray(data['division']).map((data) =>
          plainToClassFromExist(this.make(oob), data, {
            exposeDefaultValues: true,
            excludeExtraneousValues: true,
          }),
        ),
      )
      .flat(1);
  }
}
