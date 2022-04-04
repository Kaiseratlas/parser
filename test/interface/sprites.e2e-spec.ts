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

    it('every sprite should have a id', () => {
      expect(sprites.every((sprite) => typeof sprite.id === 'string')).toBe(
        true,
      );
    });

    it('every sprite should have a unique id', () => {
      expect(new Set(sprites.map((sprite) => sprite.id)).size).toBe(
        sprites.length,
      );
    });

    it('every sprite has a texture file path', () => {
      expect(
        sprites.every((sprite) => typeof sprite.textureFile === 'string'),
      ).toBe(true);
    });
  });

  describe('get a sprite by id', () => {
    let sprite: Sprite;
    const spriteId = 'GFX_NOR_ace_Helner_Spang';

    beforeAll(async () => {
      sprite = await kr.interface.sprites.get(spriteId);
    });

    it('result should be an instance of sprite class', () => {
      expect(sprite instanceof Sprite).toBe(true);
    });

    it('result should be an instance of the sprite class', () => {
      expect(sprite.id).toBe(spriteId);
    });

    it('texture file should be successfully loaded', async () => {
      const textureFile = await sprite.readFile();
      expect(Buffer.isBuffer(textureFile)).toBe(true);
    });
  });
});
