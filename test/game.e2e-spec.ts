import { Mod } from '../src/core/classes/mod.class';

describe('HOI4 Game (e2e)', () => {
  describe('load all mods', () => {
    let mods: Mod[];

    beforeAll(async () => {
      mods = await hoi4.mods.load();
      // console.log('mods', mods);
    });

    it('', () => {
      expect(mods.length).toBeTruthy();
    });

    it('', () => {
      expect(mods.every((mod) => mod instanceof Mod)).toBe(true);
    });

    it('', () => {
      expect(new Set(mods.map((mod) => mod.name)).size).toBe(mods.length);
    });
  });

  describe('find a mod by name', () => {
    let krMod: Mod;
    const modName = 'Kaiserreich';

    beforeAll(async () => {
      krMod = await hoi4.mods.get(modName);
    });

    it('should be an instance of the mod class', () => {
      expect(krMod instanceof Mod).toBe(true);
    });

    it('should be matched with the expected name', () => {
      expect(krMod.name).toBe(modName);
    });

    describe('load submods', () => {
      let submods: Mod[];

      beforeAll(async () => {
        submods = await krMod.getSubmods();
      });

      it('', () => {
        expect(submods.length).toBeTruthy();
      });

      it('every item should be an instance of the mod class', () => {
        expect(submods.every((mod) => mod instanceof Mod)).toBe(true);
      });

      it('', () => {
        expect(
          submods.every((mod) => mod.dependencies.includes(krMod.name)),
        ).toBe(true);
      });
    });
  });
});
