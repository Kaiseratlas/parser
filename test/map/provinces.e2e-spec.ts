import { Province } from '../../src/classes/province.class';
import { Mod } from '../../src/classes/mod.class';
import Color from 'color';

describe('KR Provinces (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all provinces', () => {
    let provinces: Province[];

    beforeAll(async () => {
      provinces = await kr.map.provinces.load();
    });

    it("provinces array shouldn't be empty", () => {
      expect(provinces.length).toBeTruthy();
    });

    it('every province should be an instance of province class', () => {
      expect(provinces.every((province) => province instanceof Province)).toBe(
        true,
      );
    });

    it('every province id should be unique', () => {
      expect(new Set(provinces.map((province) => province.id)).size).toBe(
        provinces.length,
      );
    });

    it('every province color should be unique', () => {
      expect(
        new Set(provinces.map((province) => province.color.hex())).size,
      ).toBe(provinces.length);
    });
  });

  describe('get a province by id', () => {
    let province: Province;

    beforeAll(async () => {
      province = await kr.map.provinces.get(5082); // 5082;51;186;138;land;false;hills;6
    });

    it('province should be an instance of province class', () => {
      expect(province instanceof Province).toBe(true);
    });

    it('province id should be matched with requested', () => {
      expect(province.id).toBe(5082);
    });

    it('province color should be an instance of external color class', () => {
      expect(province.color instanceof Color).toBe(true);
    });

    it('province color hex code should be equal with rgb(51, 186, 138)', () => {
      expect(province.color.hex()).toBe(Color.rgb(51, 186, 138).hex());
    });

    it('province type should be a one of values from province type enum', () => {
      expect(Object.values(Province.Type).includes(province.type)).toBe(true);
    });

    it('province is coastal variable type should be boolean', () => {
      expect(typeof province.isCoastal === 'boolean').toBe(true);
    });

    it('province is coastal variable type should be string', () => {
      expect(typeof province.terrain === 'string').toBe(true);
    });
  });
});
