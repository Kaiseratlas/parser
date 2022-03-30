import { GenericManager } from './generic.manager';
import { Entry } from 'fast-glob';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClass } from 'class-transformer';
import { Ability } from '../classes/ability.class';

export class AbilityManager extends GenericManager<Ability> {
  protected readonly wildcards = ['common/abilities/**/*.txt'];

  async get(id: Ability['id']) {
    const abilities = await this.load();
    return abilities.find((a) => a.id === id);
  }

  protected async processFile({ path }: Entry) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data['ability']).map(([id, data]: any) => {
      return plainToClass(
        Ability,
        { id, ...data },
        { excludeExtraneousValues: true },
      );
    });
  }
}
