import { Mod } from '../../src/core';
import { Sprite } from '../../src/interface';

describe('KR Sprites (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all sprites', () => {
    let sprites: Sprite[];

    beforeAll(async () => {
      sprites = await kr.interface.sprites.load();
    });

    it('every item should be an instance of the sprite class', () => {
      expect(sprites.every((sprite) => sprite instanceof Sprite)).toBe(true);
    });

    it('every sprite should have a name', () => {
      expect(sprites.every((sprite) => typeof sprite.name === 'string')).toBe(
        true,
      );
    });
    // TODO: !
    // it('every sprite should have a unique name', () => {
    //   expect(new Set(sprites.map((sprite) => sprite.name)).size).toBe(
    //     sprites.length,
    //   );
    // });

    it('every sprite has a texture file path', () => {
      expect(
        sprites.every((sprite) => typeof sprite.textureFile === 'string'),
      ).toBe(true);
    });
  });

  describe('get a sprite by name', () => {
    let sprite: Sprite;

    beforeAll(async () => {
      sprite = await kr.interface.sprites.get('GFX_NOR_ace_Helner_Spang');
    });

    it('result should be an instance of sprite class', () => {
      expect(sprite instanceof Sprite).toBe(true);
    });

    it('texture file should be successfully loaded', async () => {
      const textureFile = await sprite.readFile();
      expect(Buffer.isBuffer(textureFile)).toBe(true);
    });
  });
});
