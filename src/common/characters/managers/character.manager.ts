import { GenericManager } from '@shared/';
import {
  Character,
  CorpsCommander,
  FieldMarshal,
  CountryLeader,
} from '../classes';
import { Jomini } from 'jomini';
import fs from 'fs';
import type { Entry } from 'fast-glob';
import { plainToClassFromExist } from 'class-transformer';

function x(x) {
  if (!x) {
    return [];
  }

  if (!Array.isArray(x)) {
    return [x];
  }

  return x;
}

export class CharacterManager extends GenericManager<Character> {
  protected readonly wildcards = ['common/characters/**/*.txt'];

  make(): Character {
    return new Character(this.product);
  }

  protected async processFile({ path }: Entry) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data['characters']).map(([id, data]: any) => {
      const ch = this.make();
      const leaderRoles = x(data['country_leader']).map((n) => {
        const leader = new CountryLeader(this.product);
        return plainToClassFromExist(leader, n, {
          excludeExtraneousValues: true,
        });
      });
      const fmRoles = x(data['field_marshal']).map((n) => {
        const leader = new FieldMarshal(this.product);
        return plainToClassFromExist(leader, n, {
          excludeExtraneousValues: true,
        });
      });
      const corpsCommanders = x(data['corps_commander']).map((n) => {
        const leader = new CorpsCommander(this.product);
        return plainToClassFromExist(leader, n, {
          excludeExtraneousValues: true,
        });
      });
      ch.addRole(...leaderRoles, ...fmRoles, ...corpsCommanders);
      return plainToClassFromExist(
        ch,
        { id, ...data },
        { excludeExtraneousValues: true },
      );
    });
  }
}
