import { Parser } from '../../src/core';
import { AutonomyState } from '../../src/common';
import { Sprite } from '../../src/interface';

describe('KR Autonomous States (e2e)', () => {
  let kr: Parser;

  beforeAll(async () => {
    kr = await Parser.initialize(hoi4);
  });

  describe('load all autonomous states', () => {
    let AS: AutonomyState[];

    beforeAll(async () => {
      AS = await kr.common.AS.load();
    });

    it("autonomous state array shouldn't be empty", () => {
      expect(AS.length).toBeTruthy();
    });

    it('every item of the autonomous state array should be an instance of autonomous state category class', () => {
      expect(AS.every((as) => as instanceof AutonomyState)).toBe(true);
    });

    it('every autonomous state id should be unique', () => {
      expect(new Set(AS.map((as) => as.id)).size).toBe(AS.length);
    });
  });

  describe('get an autonomous state by id', () => {
    let AS: AutonomyState;

    beforeAll(async () => {
      AS = await kr.common.AS.get('kr_colonial_government');
    });

    it('autonomous state should be an instance of the same class', () => {
      expect(AS instanceof AutonomyState).toBe(true);
    });

    it('autonomous state id should be matched with requested', () => {
      expect(AS.id).toBe('kr_colonial_government');
    });

    it('default value type should be boolean', () => {
      expect(typeof AS.isDefault === 'boolean').toBe(true);
    });

    it('is puppet value type should be boolean', () => {
      expect(typeof AS.isPuppet === 'boolean').toBe(true);
    });

    it('use overlord color value type should be boolean', () => {
      expect(typeof AS.useOverlordColor === 'boolean').toBe(true);
    });

    it('min freedom level value type should be numeric', () => {
      expect(typeof AS.minFreedomLevel === 'number').toBe(true);
    });

    it('manpower influence level value type should be numeric', () => {
      expect(typeof AS.manpowerInfluence === 'number').toBe(true);
    });

    describe('load an autonomous state icon', () => {
      let icon: Sprite;

      beforeAll(async () => {
        icon = await AS.getIcon();
      });

      it('icon should be an instance of the sprite class', () => {
        expect(icon instanceof Sprite).toBe(true);
      });

      it('icon should contain the autonomous state id', () => {
        expect(icon.id.includes(AS.id)).toBe(true);
      });
    });
  });
});
