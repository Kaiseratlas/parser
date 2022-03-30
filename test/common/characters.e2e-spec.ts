import { Mod } from '../../src/classes/mod.class';
import { Character } from '../../src/common/characters/classes/character.class';
import { CountryLeader } from '../../src/common/characters/classes/country-leader.class';

describe('KR Characters (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all characters', () => {
    let characters: Character[];

    beforeAll(async () => {
      characters = await kr.common.characters.load();
      console.log('characters', characters);
    });

    it("characters array shouldn't be empty", () => {
      expect(characters.length).toBeTruthy();
    });

    it('every character should be an instance of character class', () => {
      expect(characters.every((ch) => ch instanceof Character)).toBe(true);
    });
  });

  describe('', () => {
    let character: Character;
    const charId = 'ANG_monsenhor_alves_da_cunha';

    beforeAll(async () => {
      character = await kr.common.characters.get(charId);
      console.log('character', character);
    });

    it('', () => {
      expect(character.id).toBe(charId);
    });

    it('', () => {
      expect(Array.isArray(character.roles)).toBe(true);
    });

    it('', () => {
      expect(character.roles[0] instanceof CountryLeader).toBe(true);
    });
  });
});
