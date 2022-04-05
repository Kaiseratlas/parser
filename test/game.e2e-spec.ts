import { Game } from '../src/core';
import { Mod } from '../src/core/classes/mod.class';

describe('HOI4 Game (e2e)', () => {
  let game: Game;

  beforeAll(() => {
    game = Game.fromPath(process.env.GAME_PATH);
  });

  describe('load all mods', () => {
    let mods: Mod[];

    beforeAll(async () => {
      mods = await game.mods.load();
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
      krMod = await game.mods.get(modName);
      //console.log('mod', mods);
    });

    it('should ', () => {
      expect(krMod instanceof Mod).toBe(true);
    });

    it('should ', () => {
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

      it('', () => {
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
