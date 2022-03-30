import { Mod } from '../../src/classes/mod.class';
import { CountryHistory } from '../../src/classes/country-history';
import { State } from '../../src/classes/state.class';
import { CountryPolitics } from '../../src/classes/country-politics.class';
import { Character } from '../../src/classes/character.class';

describe('KR Country History (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all country history', () => {
    let history: CountryHistory[];

    beforeAll(async () => {
      history = await kr.history.countries.load();
    });

    it("history array shouldn't be empty", () => {
      expect(history.length).toBeTruthy();
    });
  });

  describe('get an history by country tag', () => {
    let history: CountryHistory;

    beforeAll(async () => {
      history = await kr.history.countries.get('AFG');
    });

    it('country history an instance of the same class', async () => {
      expect(history instanceof CountryHistory).toBe(true);
    });

    it('country research slots count should be a number', async () => {
      expect(typeof history.researchSlots === 'number').toBe(true);
    });

    it('country stability level should be a number', async () => {
      expect(typeof history.stability === 'number').toBe(true);
    });

    it('country war support level should be a number', async () => {
      expect(typeof history.warSupport === 'number').toBe(true);
    });

    describe('load a country capital data', () => {
      let capital: State;

      beforeAll(async () => {
        capital = await history.getCapital();
      });

      it('capital should be an instance of state class', () => {
        expect(capital instanceof State).toBe(true);
      });

      it('capital of Afghanistan should be placed in Kabul', () => {
        expect(capital.id).toBe(267);
      });
    });

    describe('load a county politics', () => {
      let politics: CountryPolitics;

      beforeAll(() => {
        politics = history.politics;
      });

      it('capital should be an instance of country politics class', () => {
        expect(politics instanceof CountryPolitics).toBe(true);
      });

      it('last election date variable should be an instance of date class', () => {
        expect(politics.lastElection instanceof Date).toBe(true);
      });

      it('elections frequency variable type should be a numeric', () => {
        expect(typeof politics.electionFrequency === 'number').toBe(true);
      });

      it('elections allowed variable type should be a boolean', () => {
        expect(typeof politics.electionsAllowed === 'boolean').toBe(true);
      });
    });

    describe('load a county characters', () => {
      let characters: Character[];

      beforeAll(async () => {
        characters = await history.getCharacters();
      });

      it("characters array shouldn't be empty", () => {
        expect(characters.length).toBeTruthy();
      });

      it('every character should be an instance of character class', () => {
        expect(characters.every((ch) => ch instanceof Character)).toBe(true);
      });
    });
  });
});
