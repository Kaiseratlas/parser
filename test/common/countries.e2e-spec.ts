import { Country, CountryColor } from '../../src/common/countries';
import { CountryHistory, State } from '../../src/history';
import { NameBase } from '../../src/common/names';
import { Color, FocusTree, Sprite } from '../../src';
import type { CountryFlag } from '../../src';
import fs from 'fs';
import path from 'path';

describe('KR Countries (e2e)', () => {
  describe('load all countries', () => {
    let countries: Country[];

    beforeAll(async () => {
      countries = await kr.common.countries.load();
    });

    it("countries array shouldn't be empty", () => {
      expect(countries.length).toBeTruthy();
    });

    it('every countries item should be an instance of the country class', () => {
      expect(countries.every((country) => country instanceof Country)).toBe(
        true,
      );
    });

    it('every country tag should be unique', () => {
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

    it('country should be an instance of the same class', () => {
      expect(country instanceof Country).toBe(true);
    });

    it('a country tag should be matched with requested', () => {
      expect(country.tag).toBe(countryTag);
    });

    it('Afghanistan should be a NOT dynamic country in the game', () => {
      expect(country.isDynamic).toBe(false);
    });

    describe('localisation', () => {
      describe('country adjectives', () => {
        const defaultAdj = 'Afghan';

        it(`a current adjective should be matched with default (${defaultAdj})`, async () => {
          const currentAdj = await country.getCurrentAdjective();
          expect(currentAdj.value).toBe(defaultAdj);
        });

        it(`a radical socialist adjective should be matched with default (${defaultAdj})`, async () => {
          const radSocAdj = await country.getAdjective('radical_socialist');
          expect(radSocAdj.value).toBe(defaultAdj);
        });
      });

      describe('country names', () => {
        const defaultName = 'Afghanistan';

        it(`a current name should be matched with default (${defaultName})`, async () => {
          const currentName = await country.getCurrentName();
          expect(currentName.value).toBe(defaultName);
        });

        it('a radical socialist name should be matched with expected (Democratic Republic of Afghanistan)', async () => {
          const radSocName = await country.getName('radical_socialist');
          expect(radSocName.value).toBe('Democratic Republic of Afghanistan');
        });
      });
    });

    it('a country history should be an instance of the same class', async () => {
      const history = await country.getHistory();
      expect(history instanceof CountryHistory).toBe(true);
    });

    it('a country name base should be an instance of the same class', async () => {
      const nameBase = await country.getNames();
      expect(nameBase instanceof NameBase).toBe(true);
    });

    describe('load country color', () => {
      let color: CountryColor;

      beforeAll(async () => {
        color = await country.getColor();
      });

      it('color tag should be matched with the country tag', () => {
        expect(color.tag).toBe(countryTag);
      });

      it('main color should be an instance of the color class', () => {
        expect(color.main instanceof Color).toBe(true);
      });

      it('main color HEX should be matched with expected', () => {
        expect(color.main.hex()).toBe(Color.rgb(64, 160, 167).hex());
      });

      it('UI color should be an instance of the color class', () => {
        expect(color.ui instanceof Color).toBe(true);
      });

      it('UI color HEX should be matched with expected', () => {
        expect(color.ui.hex()).toBe(Color.rgb(83, 208, 217).hex());
      });
    });

    describe('country flags', () => {
      describe('load all country flags', () => {
        let flags: CountryFlag[];

        beforeAll(async () => {
          flags = await country.getFlags();
        });

        it("country flags array shouldn't be empty", () => {
          expect(flags.length).toBeTruthy();
        });

        it('every array item should be an instance of the country flag class', () => {
          expect(flags.every((flag) => flag instanceof Country.Flag)).toBe(
            true,
          );
        });

        it('every country flag variant should be unique', () => {
          expect(new Set(flags.map((flag) => flag.id)).size).toBe(flags.length);
        });
      });

      describe('', () => {
        let currentFlag: CountryFlag;

        beforeAll(async () => {
          currentFlag = await country.getCurrentFlag();
        });

        it('ruling party flag should be an instance of the country flag class', () => {
          expect(currentFlag instanceof Country.Flag).toBe(true);
        });

        it('flag variant should be matched with ruling party ideology id', async () => {
          const history = await country.getHistory();
          expect(
            currentFlag.id.includes(history.politics.rulingParty.ideologyId),
          ).toBe(true);
        });
      });

      describe('', () => {
        let flag: CountryFlag;
        const variant = 'authoritarian_democrat';

        beforeAll(async () => {
          flag = await country.getFlag(variant);
        });

        it('flag should be an instance of the same class', () => {
          expect(flag instanceof Country.Flag).toBe(true);
        });

        it('flag variant should be matched with requested', () => {
          expect(flag.id.includes(variant)).toBe(true);
        });

        describe('check flag sizes', () => {
          async function checkFlags(size: string) {
            const filename = `flag-${size}.png`;
            const originalFlag = await fs.promises.readFile(
              path.join(__dirname, 'images', filename),
            );
            const pngFlag = await flag[size].png.toBuffer();
            return Buffer.compare(originalFlag, pngFlag) === 0;
          }

          ['standard', 'medium', 'small'].forEach((size) => {
            it(`${size} flag size should be an instance of the sprite class`, () => {
              expect(flag[size] instanceof Sprite).toBe(true);
            });

            it(`TGA to PNG conversion (${size}) should be completed successfully`, async () => {
              expect(await checkFlags(size)).toBe(true);
            });
          });
        });
      });
    });

    it('load a country manpower', async () => {
      const manpower = await country.getManpower();
      expect(manpower).toBeGreaterThanOrEqual(10 * 1000 * 1000);
    });

    describe('load a country states', () => {
      let states: State[];

      beforeAll(async () => {
        states = await country.getStates();
      });

      it("states array shouldn't be empty", () => {
        expect(states.length).toBeTruthy();
      });

      it('every states array item should be an instance of the state class', () => {
        expect(states.every((state) => state instanceof State)).toBe(true);
      });

      it('every state should be controlled by the country', () => {
        expect(
          states.every((state) => state.history.isControlledBy(country)),
        ).toBe(true);
      });
    });
  });

  describe('get a country by tag with focus trees', () => {
    let country: Country;
    let trees: FocusTree[];

    beforeAll(async () => {
      country = await kr.common.countries.get('CAN'); // Canada
      trees = await country.getFocusTrees();
    });

    it('', () => {
      expect(trees.length).toBeTruthy();
    });

    it('', () => {
      expect(trees.every((tree) => tree instanceof FocusTree)).toBe(true);
    });

    it('', () => {
      expect(new Set(trees.map((tree) => tree.id)).size).toBe(trees.length);
    });
  });
});
