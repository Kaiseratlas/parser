import { Continent, Province } from '../../src/map';
import { State, Color, TerrainCategory } from '../../src';

describe('KR Provinces (e2e)', () => {
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
      console.log('province', province);
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

    describe('load a terrain category', () => {
      let terrainCategory: TerrainCategory;

      beforeAll(async () => {
        terrainCategory = await province.getTerrainCategory();
      });

      it('terrain category should be an instance of the terrain category class', () => {
        expect(terrainCategory instanceof TerrainCategory).toBe(true);
      });
    });

    describe('load a continent', () => {
      let continent: Continent;

      beforeAll(async () => {
        continent = await province.getContinent();
      });

      it('continent should be an instance of the same class', () => {
        expect(continent instanceof Continent).toBe(true);
      });

      it('continent id should be matched with continent id from the province', () => {
        expect(continent.id).toBe(province['continentId']);
      });
    });

    describe('load a continent', () => {
      let state: State;

      beforeAll(async () => {
        state = await province.getState();
      });

      it('state should be an instance of the same class', () => {
        expect(state instanceof State).toBe(true);
      });

      it('state should have the province', () => {
        expect(state.hasProvince(province.id)).toBe(true);
      });
    });
  });
});
