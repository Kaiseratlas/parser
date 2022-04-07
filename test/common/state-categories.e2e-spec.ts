import { StateCategory } from '../../src/common';
import Color from 'color';

describe('KR State Categories (e2e)', () => {
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
    const stateCategoryId = 'one_island';

    beforeAll(async () => {
      stateCategory = await kr.common.stateCategories.get(stateCategoryId);
    });

    it('state category should be an instance of the same class', () => {
      expect(stateCategory instanceof StateCategory).toBe(true);
    });

    it('state category id should be matched with requested', () => {
      expect(stateCategory.id).toBe(stateCategoryId);
    });

    it('local building slots count should be numeric', () => {
      expect(typeof stateCategory.localBuildingSlots === 'number').toBe(true);
    });

    describe('state category color', () => {
      it('color should be an instance of the color class', () => {
        expect(stateCategory.color instanceof Color).toBe(true);
      });

      it('color should be an instance of the color class', () => {
        expect(stateCategory.color.hex()).toBe(Color.rgb(200, 160, 0).hex());
      });
    });
  });
});
