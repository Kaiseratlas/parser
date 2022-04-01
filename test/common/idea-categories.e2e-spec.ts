import { Mod } from '../../src/core';
import { IdeaCategory } from '../../src/common/ideas/classes/idea-category.class';
import { Sprite } from '../../src/interface';

describe('KR Idea Categories (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all idea categories', () => {
    let ideaCategories: IdeaCategory[];

    beforeAll(async () => {
      ideaCategories = await kr.common.ideaCategories.load();
    });

    it(' ', () => {
      expect(ideaCategories.length).toBeTruthy();
    });
  });

  describe('get an idea category by id', () => {
    let ideaCategory: IdeaCategory;
    const ideaCategoryId = 'research_production';

    beforeAll(async () => {
      ideaCategory = await kr.common.ideaCategories.get(ideaCategoryId);
    });

    it('idea category should be an instance of the same class', () => {
      expect(ideaCategory instanceof IdeaCategory).toBe(true);
    });

    it('idea category id should be matched with requested', () => {
      expect(ideaCategory.id).toBe(ideaCategoryId);
    });

    it('idea category cost should be numeric or null', () => {
      expect(
        typeof ideaCategory.cost === 'number' || ideaCategory.cost === null,
      ).toBe(true);
    });

    it('idea category removal cost should be numeric or null', () => {
      expect(
        typeof ideaCategory.removalCost === 'number' ||
          ideaCategory.cost === null,
      ).toBe(true);
    });

    describe('idea category slots', () => {
      it('every slot item should be an instance of the same class', () => {
        expect(
          ideaCategory.slots.every((slot) => slot instanceof IdeaCategory.Slot),
        ).toBe(true);
      });

      it('every slot id should be unique', () => {
        expect(new Set(ideaCategory.slots.map((slot) => slot.id)).size).toBe(
          ideaCategory.slots.length,
        );
      });

      describe('load idea category slot icon', () => {
        let slotIcon: Sprite;

        beforeAll(async () => {
          slotIcon = await ideaCategory.slots[0].getIcon();
        });

        it('icon should be an instance of sprite class', () => {
          expect(slotIcon instanceof Sprite).toBe(true);
        });

        it('icon name should contain the slot id', () => {
          expect(slotIcon.name.includes(ideaCategory.slots[0].id)).toBe(true);
        });
      });
    });
  });
});
