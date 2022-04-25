import { GenericManager } from '@shared/';
import { Unit } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { UnitCategoryManager } from './unit-category.manager';
import { EquipmentManager } from './equipment.manager';

export class UnitManager extends GenericManager<Unit> {
  protected readonly wildcards = ['common/units/**/*.txt'];

  readonly categories = new UnitCategoryManager(this.product);
  readonly equipments = new EquipmentManager(this.product);

  make(group: Unit['group'], id: Unit['id']): Unit {
    return new Unit(this.product, group, id);
  }

  protected async processFile({ path }): Promise<Unit[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['sub_units'] ?? {}).map(
      ([id, data]) => {
        const group = data['group']
          ? new Unit.Group(this.product, data['group'] as string)
          : null;
        return plainToClassFromExist(this.make(group, id), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        });
      },
    );
  }
}
