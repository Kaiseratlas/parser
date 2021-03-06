import type { IdeaCategory } from '../../../src/common';
import { Idea, Sprite } from '../../../src';

describe('KR Idea Categories (e2e)', () => {
  describe('load all idea categories', () => {
    let ideaCategories: IdeaCategory[];

    beforeAll(async () => {
      ideaCategories = await kr.common.ideas.categories.load();
    });

    it("idea categories array shouldn't be empty", () => {
      expect(ideaCategories.length).toBeTruthy();
    });

    it('every idea categories array item should be an instance of the idea category class', () => {
      expect(
        ideaCategories.every(
          (ideaCategory) => ideaCategory instanceof Idea.Category,
        ),
      ).toBe(true);
    });

    it('every idea category should have a unique id', () => {
      expect(
        new Set(ideaCategories.map((ideaCategory) => ideaCategory.id)).size,
      ).toBe(ideaCategories.length);
    });
  });

  describe('get an idea category by id', () => {
    let ideaCategory: IdeaCategory;
    const ideaCategoryId = 'research_production';

    beforeAll(async () => {
      ideaCategory = await kr.common.ideas.categories.get(ideaCategoryId);
    });

    it('idea category should be an instance of the same class', () => {
      expect(ideaCategory instanceof Idea.Category).toBe(true);
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
          ideaCategory.slots.every((slot) => slot instanceof Idea.Slot),
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

        it('icon id should contain the slot id', () => {
          expect(slotIcon.id.includes(ideaCategory.slots[0].id)).toBe(true);
        });
      });
    });
  });
});
