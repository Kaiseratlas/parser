import { convertToArray, GenericManager } from '@shared/';
import type { UnitCategory } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { Unit } from '../classes';

export class UnitCategoryManager extends GenericManager<UnitCategory> {
  protected readonly wildcards = ['common/unit_tags/**/*.txt'];

  make(id: UnitCategory['id']): UnitCategory {
    return new Unit.Category(this.product, id);
  }

  protected async processFile({ path }): Promise<UnitCategory[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return convertToArray(data['sub_unit_categories']).map((id: string) =>
      this.make(id),
    );
  }
}
