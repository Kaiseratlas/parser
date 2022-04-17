import { TerrainCategory } from '../../../src';

describe('KR Terrain Categories (e2e)', () => {
  describe('load all terrain categories', () => {
    let terrainCategories: TerrainCategory[];

    beforeAll(async () => {
      terrainCategories = await kr.common.terrain.categories.load();
    });

    it('', () => {
      expect(terrainCategories.length).toBeTruthy();
    });

    it('', () => {
      expect(
        terrainCategories.every(
          (terrainCategory) => terrainCategory instanceof TerrainCategory,
        ),
      ).toBe(true);
    });

    it('', () => {
      expect(
        new Set(terrainCategories.map((terrainCategory) => terrainCategory.id))
          .size,
      ).toBe(terrainCategories.length);
    });
  });
});
