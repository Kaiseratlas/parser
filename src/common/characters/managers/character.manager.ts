import { GenericManager } from '@shared/';
import {
  Character,
  CorpsCommander,
  FieldMarshal,
  CountryLeader,
  CharacterPortrait,
} from '../classes';
import { Jomini } from 'jomini';
import fs from 'fs';
import type { Entry } from 'fast-glob';
import { plainToClassFromExist } from 'class-transformer';
import { convertToArray } from '@shared/';
import type { CharacterPortraitType } from '../enums';

export class CharacterManager extends GenericManager<Character> {
  protected readonly wildcards = ['common/characters/**/*.txt'];

  make(id: Character['id']): Character {
    return new Character(this.product, id);
  }

  protected async processFile({ path }: Entry): Promise<Character[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);

    return convertToArray(data?.['characters']).flatMap((d) =>
      Object.entries(d).map(([id, charData]) => {
        const ch = this.make(id);
        const [leaderRoles, fmRoles, corpsCommanders] = [
          CountryLeader,
          FieldMarshal,
          CorpsCommander,
        ].map((cls) =>
          convertToArray(charData[cls.Key]).map((n) =>
            plainToClassFromExist(new cls(this.product), n, {
              excludeExtraneousValues: true,
              exposeDefaultValues: true,
            }),
          ),
        );

        // TODO: !
        // if (!charData['portraits']) {
        //   console.log('charData[\'portraits\']', charData)
        // }

        Object.entries(charData['portraits'] ?? {}).forEach(
          ([type, portraitData]) =>
            ch.addPortrait(
              type as CharacterPortraitType,
              plainToClassFromExist(
                new CharacterPortrait(
                  this.product,
                  type as CharacterPortraitType,
                  ch,
                ),
                portraitData,
                {
                  excludeExtraneousValues: true,
                  exposeDefaultValues: true,
                },
              ),
            ),
        );

        ch.addRole(...leaderRoles, ...fmRoles, ...corpsCommanders);
        return plainToClassFromExist(ch, charData, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        });
      }),
    );
  }
}
