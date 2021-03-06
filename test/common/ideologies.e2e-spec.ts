import { Ideology } from '../../src/common';
import { Color } from '../../src';
import { Sprite } from '../../src/interface';

describe('KR Ideologies (e2e)', () => {
  describe('load all ideologies', () => {
    let ideologies: Ideology[];

    beforeAll(async () => {
      ideologies = await kr.common.ideologies.load();
    });

    it('', () => {
      expect(ideologies.length).toBeTruthy();
    });

    it('every item should be an instance of ideology class', () => {
      expect(ideologies.every((ideology) => ideology instanceof Ideology)).toBe(
        true,
      );
    });

    it('', () => {
      expect(new Set(ideologies.map((ideology) => ideology.id)).size).toBe(
        ideologies.length,
      );
    });
  });

  describe('get ideology by id', () => {
    let ideology: Ideology;

    beforeAll(async () => {
      ideology = await kr.common.ideologies.get('social_liberal');
    });

    it('ideology should be an instance of the same class', () => {
      expect(ideology instanceof Ideology).toBe(true);
    });

    it('ideology id should be matched with requested', () => {
      expect(ideology.id).toBe('social_liberal');
    });

    it('can be boosted variable type should be boolean', () => {
      expect(typeof ideology.canBeBoosted === 'boolean').toBe(true);
    });

    it('can collaborate variable type should be boolean', () => {
      expect(typeof ideology.canCollaborate === 'boolean').toBe(true);
    });

    it('ideology color should be an instance of color class', () => {
      expect(ideology.color instanceof Color).toBe(true);
    });

    it('', () => {
      expect(ideology.color.hex()).toBe(Color.rgb(246, 139, 31).hex());
    });

    describe('load an ideology icon', () => {
      let icon: Sprite;

      beforeAll(async () => {
        icon = await ideology.getIcon();
      });

      it('icon type should be a instance of sprite class', () => {
        expect(icon instanceof Sprite).toBe(true);
      });

      it('icon name should contain the ideology id', () => {
        expect(icon.id.includes(ideology.id)).toBe(true);
      });
    });
  });
});
