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
import { x } from '../../../interface';

export class CharacterManager extends GenericManager<Character> {
  protected readonly wildcards = ['common/characters/**/*.txt'];

  async get(id: Character['id']) {
    const characters = await this.load();
    return characters.find((ch) => ch.id === id);
  }

  protected async processFile({ path }: Entry) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data['characters']).map(([id, data]: any) => {
      const ch = new Character(this.product);
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
