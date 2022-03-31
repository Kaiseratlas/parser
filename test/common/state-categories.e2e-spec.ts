import { Mod } from '../../src/core';
import { StateCategory } from '../../src/common';

describe('KR State Categories (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all state categories', () => {
    let stateCategories: StateCategory[];

    beforeAll(async () => {
      stateCategories = await kr.common.stateCategories.load();
    });

    it("state category array shouldn't be empty", () => {
      expect(stateCategories.length).toBeTruthy();
    });

    it('every state category of the state array should be an instance of state category class', () => {
      expect(
        stateCategories.every(
          (stateCategory) => stateCategory instanceof StateCategory,
        ),
      ).toBe(true);
    });

    it('every state category id should be unique', () => {
      expect(
        new Set(stateCategories.map((stateCategory) => stateCategory.id)).size,
      ).toBe(stateCategories.length);
    });
  });

  describe('get state category by id', () => {
    let stateCategory: StateCategory;

    beforeAll(async () => {
      stateCategory = await kr.common.stateCategories.get('one_island');
    });

    it('state category should be an instance of the same class', () => {
      expect(stateCategory instanceof StateCategory).toBe(true);
    });

    it('state category id should be matched with requested', () => {
      expect(stateCategory.id).toBe('one_island');
    });

    it('local building slots count should be numeric', () => {
      expect(typeof stateCategory.localBuildingSlots === 'number').toBe(true);
    });
  });
});
