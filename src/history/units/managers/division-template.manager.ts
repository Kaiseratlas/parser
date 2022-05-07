import { convertToArray, GenericManager } from '@shared/';
import { Division } from '../classes';
import type { DivisionTemplate } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class DivisionTemplateManager extends GenericManager<DivisionTemplate> {
  protected readonly wildcards = ['history/units/**/*.txt'];

  make(): DivisionTemplate {
    return new Division.Template(this.product);
  }

  protected serializeTemplateUnit(data) {
    return Object.entries(data)
      .map(([unitId, coords]) => [
        unitId,
        convertToArray(coords) as Array<Record<string, number>>,
      ])
      .map(([unitId, coords]) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        coords.map(({ x, y }) => ({ unitId, x, y })),
      )
      .flat(1);
  }

  protected async processFile({ path }): Promise<DivisionTemplate[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return convertToArray(data['division_template']).map((data) => {
      const divisionTemplate = plainToClassFromExist(this.make(), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });
      const regiments = convertToArray(data['regiments'])
        .map(this.serializeTemplateUnit.bind(this))
        .flat(1);
      const support = convertToArray(data['support'])
        .map(this.serializeTemplateUnit.bind(this))
        .flat(1);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      divisionTemplate.addRegiment(...regiments);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      divisionTemplate.addSupport(...support);
      return divisionTemplate;
    });
  }
}
