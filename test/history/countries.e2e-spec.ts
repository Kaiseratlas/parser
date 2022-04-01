import { Mod } from '../../src/core';
import { CountryHistory, State, CountryPolitics } from '../../src/history';
import { Character, Idea, Ideology } from '../../src/common';
import { PoliticalParty } from '../../src/history/states/classes/political-party.class';

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

    it('every item should be an instance of the country history class', () => {
      expect(
        history.every(
          (countryHistory) => countryHistory instanceof CountryHistory,
        ),
      ).toBeTruthy();
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

    describe('county politics', () => {
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

    describe('political parties', () => {
      let parties: PoliticalParty[];
      let ideologies: Ideology[];

      beforeAll(async () => {
        ideologies = await kr.common.ideologies.load();
        parties = history.parties;
      });

      it('every item should be an instance of the political party class', () => {
        expect(
          parties.every(
            (politicalParty) => politicalParty instanceof PoliticalParty,
          ),
        ).toBe(true);
      });

      it('political parties count should be matched with the ideologies count', () => {
        expect(parties.length).toBe(ideologies.length);
      });

      it('all political parties rating sum should be equals to 100%', () => {
        expect(
          parties.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.popularity,
            0,
          ),
        ).toBe(100);
      });
    });

    describe('load a country ideas', () => {
      let ideas: Idea[];

      beforeAll(async () => {
        ideas = await history.getIdeas();
        // console.log('ideas', ideas); TODO: fix
      });

      it("array of ideas shouldn't be empty", () => {
        expect(ideas.length).toBeTruthy();
      });

      it('every item should be an instance of the idea class', () => {
        expect(ideas.every((idea) => idea instanceof Idea)).toBe(true);
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
