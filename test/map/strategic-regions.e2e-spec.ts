import { Parser } from '../../src/core';
import { Province, StrategicRegion } from '../../src/map';
import { Localisation } from '../../src/localisation';

describe('KR Strategic Regions (e2e)', () => {
  let kr: Parser;

  beforeAll(async () => {
    kr = await Parser.initialize(hoi4);
  });

  describe('load all strategic regions', () => {
    let strategicRegions: StrategicRegion[];

    beforeAll(async () => {
      strategicRegions = await kr.map.strategicRegions.load();
    });

    it("strategic regions array shouldn't be empty", () => {
      expect(strategicRegions.length).toBeTruthy();
    });

    it('every item should be an instance of the strategic region class', () => {
      expect(
        strategicRegions.every(
          (strategicRegions) => strategicRegions instanceof StrategicRegion,
        ),
      ).toBe(true);
    });

    it('every strategic region id should be unique', () => {
      expect(
        new Set(strategicRegions.map((strategicRegions) => strategicRegions.id))
          .size,
      ).toBe(strategicRegions.length);
    });
  });

  describe('get a strategic region by id', () => {
    let strategicRegion: StrategicRegion;
    const strategicRegionId = 18; // English Channel

    beforeAll(async () => {
      strategicRegion = await kr.map.strategicRegions.get(strategicRegionId);
    });

    it('strategic region should be an instance of the same class', () => {
      expect(strategicRegion instanceof StrategicRegion).toBe(true);
    });

    it('strategic region id should be matched with expected', () => {
      expect(strategicRegion.id).toBe(strategicRegionId);
    });

    describe('load a strategic region name', () => {
      let name: Localisation;

      beforeAll(async () => {
        name = await strategicRegion.getName();
      });

      it('', () => {
        expect(name instanceof Localisation).toBe(true);
      });

      it('', () => {
        expect(name.key).toBe(strategicRegion['name']);
      });

      it('', () => {
        expect(name.value).toBe('English Channel');
      });
    });

    describe('load a strategic region provinces', () => {
      let provinces: Province[];

      beforeAll(async () => {
        provinces = await strategicRegion.getProvinces();
      });

      it('', () => {
        expect(provinces.length).toBeTruthy();
      });

      it('', () => {
        expect(provinces.length).toBe(strategicRegion['provinceIds'].length);
      });

      it('', () => {
        expect(
          provinces.every((province) => province instanceof Province),
        ).toBe(true);
      });

      it('', () => {
        expect(
          provinces.every((province) =>
            strategicRegion['provinceIds'].includes(province.id),
          ),
        ).toBe(true);
      });
    });
  });
});
