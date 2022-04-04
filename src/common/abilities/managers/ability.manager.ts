import { GenericManager } from '@shared/';
import { Entry } from 'fast-glob';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { Ability } from '../classes';

export class AbilityManager extends GenericManager<Ability> {
  protected readonly wildcards = ['common/abilities/**/*.txt'];

  make(id: Ability['id']): Ability {
    return new Ability(this.product, id);
  }

  protected async processFile({ path }: Entry) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data[Ability.Key]).map(
      ([id, data]) =>
        plainToClassFromExist(this.make(id), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        }),
    );
  }
}
