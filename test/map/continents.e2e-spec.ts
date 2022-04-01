import { Mod } from '../../src/core';
import { Continent } from '../../src/map';

describe('', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all continents', () => {
    let continents: Continent[];

    beforeAll(async () => {
      continents = await kr.map.continents.load();
      console.log('continents', continents);
    });

    it('', () => {
      expect(continents.length).toBeTruthy();
    });

    it('', () => {
      expect(
        continents.every((continent) => continent instanceof Continent),
      ).toBe(true);
    });

    it('', () => {
      expect(new Set(continents.map((continent) => continent.id)).size).toBe(
        continents.length,
      );
    });

    it('', () => {
      expect(new Set(continents.map((continent) => continent.name)).size).toBe(
        continents.length,
      );
    });
  });

  describe('get a continent by id', () => {
    let continent: Continent;

    beforeAll(async () => {
      continent = await kr.map.continents.get(3);
    });

    it('', () => {
      expect(continent instanceof Continent).toBe(true);
    });

    it('', () => {
      expect(continent.id).toBe(3);
    });

    it('', () => {
      expect(continent.name).toBe('australia');
    });
  });
});
