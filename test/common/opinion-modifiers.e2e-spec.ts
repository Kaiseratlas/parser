import { Mod } from '../../src/core';
import { OpinionModifier } from '../../src/common/opinion-modifiers';

describe('KR Opinion Modifiers (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all opinion modifiers', () => {
    let opinionModifiers: OpinionModifier[];

    beforeAll(async () => {
      opinionModifiers = await kr.common.opinionModifiers.load();
    });

    it("opinion modifiers array shouldn't be empty", () => {
      expect(opinionModifiers.length).toBeTruthy();
    });

    it('every item should be an instance of the opinion modifier class', () => {
      expect(
        opinionModifiers.every(
          (opinionModifier) => opinionModifier instanceof OpinionModifier,
        ),
      ).toBe(true);
    });
  });

  describe('get opinion modifier by id', () => {
    let opinionModifier: OpinionModifier;
    const opinionModifierId = 'improve_relation';

    beforeAll(async () => {
      opinionModifier = await kr.common.opinionModifiers.get(opinionModifierId);
    });

    it('should be an instance of the opinion modifier class', () => {
      expect(opinionModifier instanceof OpinionModifier).toBe(true);
    });

    it('opinion modifier id should be matched with requested', () => {
      expect(opinionModifier.id).toBe(opinionModifierId);
    });

    it('trade flag type should be numeric', () => {
      expect(typeof opinionModifier.trade === 'boolean').toBe(true);
    });

    it('value type should be numeric', () => {
      expect(typeof opinionModifier.value === 'number').toBe(true);
    });

    it('max trust level value type should be 200', () => {
      expect(opinionModifier.maxTrust).toBe(200);
    });
  });
});
