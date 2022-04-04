import { Mod } from '../../src/core';
import { Focus, FocusTree } from '../../src/common/goals';
import { Sprite } from '../../src/interface';

describe('KR Goals (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all focus trees', () => {
    let focusTrees: FocusTree[];

    beforeAll(async () => {
      focusTrees = await kr.common.goals.load();
    });

    it("focus trees array shouldn't be empty", () => {
      expect(focusTrees.length).toBeTruthy();
    });

    it('every item should be an instance of the focus tree class', () => {
      expect(
        focusTrees.every((focusTree) => focusTree instanceof FocusTree),
      ).toBe(true);
    });

    it('every focus tree id should be unique', () => {
      expect(new Set(focusTrees.map((focusTree) => focusTree.id)).size).toBe(
        focusTrees.length,
      );
    });
  });

  describe('get a focus tree by id', () => {
    let focusTree: FocusTree;
    const focusTreeId = 'bhutan_tree';

    beforeAll(async () => {
      focusTree = await kr.common.goals.get(focusTreeId);
    });

    it('focus tree should be matched with the same class', () => {
      expect(focusTree instanceof FocusTree).toBe(true);
    });

    it('focus tree id should be matched with requested', () => {
      expect(focusTree.id).toBe(focusTreeId);
    });

    describe('focuses', () => {
      it("focuses array shouldn't be empty", () => {
        expect(focusTree.focuses.length).toBeTruthy();
      });

      it('every focuses item should be an instance of the focus class', () => {
        expect(focusTree.focuses.every((focus) => focus instanceof Focus)).toBe(
          true,
        );
      });

      it('every focus should have a unique id', () => {
        expect(new Set(focusTree.focuses.map((focus) => focus.id)).size).toBe(
          focusTree.focuses.length,
        );
      });

      describe('get a focus by id', () => {
        let focus: Focus;
        const focusId = 'bhu_expand_dzongs';

        beforeAll(() => {
          focus = focusTree.getFocus(focusId);
        });

        it('focus should be an instance of the same class', () => {
          expect(focus instanceof Focus).toBe(true);
        });

        it('focus id should be matched with requested', () => {
          expect(focus.id).toBe(focusId);
        });

        describe('loading a focus icon', () => {
          let focusIcon: Sprite;

          beforeAll(async () => {
            focusIcon = await focus.getIcon();
          });

          it('a focus icon should be an instance of the sprite class', () => {
            expect(focusIcon instanceof Sprite).toBe(true);
          });

          it('sprite id should be matched with the focus icon name', () => {
            expect(focusIcon.id).toBe(focus['icon']);
          });

          it('sprite should be loaded successfully', async () => {
            const buffer = await focusIcon.readFile();
            expect(Buffer.isBuffer(buffer)).toBe(true);
          });
        });
      });
    });
  });
});
