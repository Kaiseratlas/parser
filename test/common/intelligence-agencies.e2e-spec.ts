import { Mod } from '../../src/core';
import { IntelligenceAgency as IA } from '../../src/common';
import { Sprite } from '../../src/interface';

describe('', () => {
  let kr: Mod;
  let agencies: IA[];

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all intelligence agencies', () => {
    beforeAll(async () => {
      agencies = await kr.common.IA.load();
    });

    it("agencies array shouldn't be empty", () => {
      expect(agencies.length).toBeTruthy();
    });

    it('every item should be an instance of IA class', () => {
      expect(agencies.every((ia) => ia instanceof IA)).toBe(true);
    });

    it('every agency has an array of names', () => {
      const checked = agencies.every((agency) => Array.isArray(agency.names));
      expect(checked).toBe(true);
    });
  });

  describe('load an emblem', () => {
    let emblem: Sprite;

    beforeAll(async () => {
      emblem = await agencies[0].getEmblem();
    });

    it('should be an instance of the sprite class', () => {
      expect(emblem instanceof Sprite).toBe(true);
    });

    it('sprite name should contain the picture name', () => {
      expect(emblem.name.includes(agencies[0]['picture'])).toBe(true);
    });
  });
});
