import { Continent } from '../../src/map';
import { Localisation } from '../../src/localisation';
import { Country } from '../../src/common/countries';

describe('KR Continents (e2e)', () => {
  describe('load all continents', () => {
    let continents: Continent[];

    beforeAll(async () => {
      continents = await kr.map.continents.load();
    });

    it("continents array shouldn't be empty", () => {
      expect(continents.length).toBeTruthy();
    });

    it('every item should be an instance of the continent class', () => {
      expect(
        continents.every((continent) => continent instanceof Continent),
      ).toBe(true);
    });

    it('every continent id should be unique', () => {
      expect(new Set(continents.map((continent) => continent.id)).size).toBe(
        continents.length,
      );
    });

    it('every continent name should be unique', () => {
      expect(new Set(continents.map((continent) => continent.name)).size).toBe(
        continents.length,
      );
    });
  });

  describe('get a continent by id', () => {
    let continent: Continent;
    const continentId = 4; // KR Australia

    beforeAll(async () => {
      continent = await kr.map.continents.get(continentId);
    });

    it('continent should be an instance of the same class', () => {
      expect(continent instanceof Continent).toBe(true);
    });

    it('continent id should be matched with expected', () => {
      expect(continent.id).toBe(continentId);
    });

    it('continent name should be matched with expected', () => {
      expect(continent.name).toBe('australia');
    });

    describe('loading all countries from to the continent', () => {
      let countries: Country[];

      beforeAll(async () => {
        countries = await continent.getCountries();
      });

      it('', () => {
        expect(countries.length).toBeTruthy();
      });
    });

    describe('localisation', () => {
      describe('loading a continent name', () => {
        let name: Localisation;

        beforeAll(async () => {
          name = await continent.getName();
        });

        it('a continent name should be an instance of the localisation class', () => {
          expect(name instanceof Localisation).toBe(true);
        });

        it('a continent name localisation key should be matched with continent name', () => {
          expect(name.key).toBe(continent.name);
        });

        it('a localised continent name should be matched with expected', () => {
          expect(name.value).toBe('Oceania');
        });
      });

      describe('loading a continent adjective', () => {
        let adj: Localisation;

        beforeAll(async () => {
          adj = await continent.getAdjective();
        });

        it('a continent adjective should be an instance of the localisation class', () => {
          expect(adj instanceof Localisation).toBe(true);
        });

        it('a continent adjective localisation key should has the continent name', () => {
          expect(adj.key.includes(continent.name)).toBe(true);
        });

        it('a localised adjective should be matched with expected', () => {
          expect(adj.value).toBe('Oceanian');
        });
      });
    });
  });
});
