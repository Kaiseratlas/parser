import { Mod } from '../../src/core';
import { Country, CountryColor } from '../../src/common/countries';
import { CountryHistory } from '../../src/history';
import { NameBase } from '../../src/common/names';
import Color from 'color';

describe('KR Countries (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all countries', () => {
    let countries: Country[];

    beforeAll(async () => {
      countries = await kr.common.countries.load();
    });

    it('', () => {
      expect(countries.length).toBeTruthy();
    });

    it('', () => {
      expect(countries.every((country) => country instanceof Country)).toBe(
        true,
      );
    });

    it('', () => {
      expect(new Set(countries.map((country) => country.tag)).size).toBe(
        countries.length,
      );
    });
  });

  describe('get a country by tag', () => {
    let country: Country;
    const countryTag = 'AFG';

    beforeAll(async () => {
      country = await kr.common.countries.get(countryTag);
    });

    it('should ', () => {
      expect(country instanceof Country).toBe(true);
    });

    it('should ', () => {
      expect(country.tag).toBe(countryTag);
    });

    it('should ', () => {
      expect(country.isDynamic).toBe(false);
    });

    it('should ', async () => {
      const history = await country.getHistory();
      expect(history instanceof CountryHistory).toBe(true);
    });

    it('should ', async () => {
      const nameBase = await country.getNames();
      expect(nameBase instanceof NameBase).toBe(true);
    });

    describe('load country color', () => {
      let color: CountryColor;

      beforeAll(async () => {
        color = await country.getColor();
      });

      it('', () => {
        expect(color.tag).toBe(countryTag);
      });

      it('', () => {
        expect(color.main instanceof Color).toBe(true);
      });

      it('', () => {
        expect(color.main.hex()).toBe(Color.rgb(64, 160, 167).hex());
      });

      it('', () => {
        expect(color.ui instanceof Color).toBe(true);
      });

      it('', () => {
        expect(color.ui.hex()).toBe(Color.rgb(83, 208, 217).hex());
      });
    });
  });
});
