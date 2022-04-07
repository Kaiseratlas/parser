import { TechnologyCategory } from '../../../src/common';
import { Localisation } from '../../../src/localisation';

describe('KR Technology Categories (e2e)', () => {
  describe('load all technology categories', () => {
    let technologyCategories: TechnologyCategory[];

    beforeAll(async () => {
      technologyCategories = await kr.common.technologies.categories.load();
    });

    it('', () => {
      expect(technologyCategories.length).toBeTruthy();
    });

    it('', () => {
      expect(
        technologyCategories.every(
          (technologyCategory) =>
            technologyCategory instanceof TechnologyCategory,
        ),
      ).toBe(true);
    });

    it('', () => {
      expect(
        new Set(
          technologyCategories.map(
            (technologyCategory) => technologyCategory.id,
          ),
        ).size,
      ).toBe(technologyCategories.length);
    });
  });

  describe('get a technology category by id', () => {
    let technologyCategory: TechnologyCategory;
    const technologyCategoryId = 'industry';

    beforeAll(async () => {
      technologyCategory = await kr.common.technologies.categories.get(
        technologyCategoryId,
      );
    });

    it('', () => {
      expect(technologyCategory instanceof TechnologyCategory).toBe(true);
    });

    it('', () => {
      expect(technologyCategory.id).toBe(technologyCategoryId);
    });

    describe('load a name', () => {
      let name: Localisation;

      beforeAll(async () => {
        name = await technologyCategory.getName();
      });

      it('', () => {
        expect(name instanceof Localisation).toBe(true);
      });

      it('', () => {
        expect(name.key).toBe(technologyCategory.id);
      });

      it('', () => {
        expect(name.value).toBe('Industry');
      });
    });
  });
});
