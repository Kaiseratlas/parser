import { GenericManager } from '@shared/';
import { Equipment, Unit } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class EquipmentManager extends GenericManager<Equipment> {
  protected readonly wildcards = ['common/units/equipment/**/*.txt'];

  make(id: Equipment['id']): Equipment {
    return new Unit.Equipment(this.product, id);
  }

  protected async processFile({ path }): Promise<Equipment[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(
      data['equipments'] ?? {},
    ).map(([id, data]) =>
      plainToClassFromExist(this.make(id), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
  }
}
