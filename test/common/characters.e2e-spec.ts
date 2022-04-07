import { Character, CountryLeader, Ideology } from '../../src/common';
import { Sprite } from '../../src/interface';

describe('KR Characters (e2e)', () => {
  describe('load all characters', () => {
    let characters: Character[];

    beforeAll(async () => {
      characters = await kr.common.characters.load();
    });

    it("characters array shouldn't be empty", () => {
      expect(characters.length).toBeTruthy();
    });

    it('every character should be an instance of character class', () => {
      expect(characters.every((ch) => ch instanceof Character)).toBe(true);
    });

    it('every character id should be unique', () => {
      expect(new Set(characters.map((ch) => ch.id)).size).toBe(
        characters.length,
      );
    });
  });

  describe('', () => {
    let character: Character;
    const charId = 'ANG_monsenhor_alves_da_cunha';

    beforeAll(async () => {
      character = await kr.common.characters.get(charId);
      console.log('character', character);
    });

    it('character id should be matched with requested', () => {
      expect(character.id).toBe(charId);
    });

    it('character roles should be an array', () => {
      expect(Array.isArray(character.roles)).toBe(true);
    });

    it('a first role of the character should be a county leader', () => {
      expect(character.roles[0] instanceof CountryLeader).toBe(true);
    });

    describe('load country leader ideology', () => {
      let ideology: Ideology;
      let role: CountryLeader;

      beforeAll(async () => {
        role = character.roles[0] as CountryLeader;
        ideology = await role.getIdeology();
      });

      it('ideology should be an instance of the same class', () => {
        expect(ideology instanceof Ideology).toBe(true);
      });
    });

    describe('portraits', () => {
      describe('civilian portraits', () => {
        let largePortrait: Sprite;

        beforeAll(() => {
          largePortrait = character.portraits.civilian.large;
          console.log('largePortrait', largePortrait);
        });

        it('', async () => {
          const buffer = await largePortrait.readFile();
          expect(Buffer.isBuffer(buffer)).toBe(true);
        });
      });
    });
  });
});
