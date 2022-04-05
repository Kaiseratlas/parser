import { Parser } from '../../src/core';
import { NameBase } from '../../src/common/names';

describe('KR Names (e2e)', () => {
  let kr: Parser;

  beforeAll(async () => {
    kr = await Parser.initialize(hoi4);
  });

  describe('load all name bases', () => {
    let nameBases: NameBase[];

    beforeAll(async () => {
      nameBases = await kr.common.names.load();
    });

    it("name base array shouldn't be empty", () => {
      expect(nameBases.length).toBeTruthy();
    });

    it('every item should be an instance of the name base class', () => {
      expect(nameBases.every((nameBase) => nameBase instanceof NameBase)).toBe(
        true,
      );
    });
  });

  describe('get name base by a country tag', () => {
    let nameBase: NameBase;
    const countryTag = 'AFG';

    beforeAll(async () => {
      nameBase = await kr.common.names.get(countryTag);
      console.log('nameBase', nameBase);
    });

    it('should be an instance of the name base class', () => {
      expect(nameBase instanceof NameBase).toBe(true);
    });

    it('name base country tag should be matched with requested', () => {
      expect(nameBase.countryTag).toBe(countryTag);
    });

    it('male names should be placed in array', () => {
      expect(Array.isArray(nameBase.male)).toBe(true);
    });

    it('male names should be placed in array', () => {
      expect(Array.isArray(nameBase.female)).toBe(true);
    });

    it('surname should be placed in array', () => {
      expect(Array.isArray(nameBase.surnames)).toBe(true);
    });

    it('call signs name should be placed in array', () => {
      expect(Array.isArray(nameBase.callSigns)).toBe(true);
    });
  });
});
