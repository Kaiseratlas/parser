import { GenericManager } from './generic.manager';
import { Sprite } from '../classes/sprite.class';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export function x(x) {
  if (!x) {
    return [];
  }

  if (!Array.isArray(x)) {
    return [x];
  }

  return x;
}

export class SpriteManager extends GenericManager<Sprite> {
  protected readonly wildcards = ['interface/**/*.gfx'];

  async get(name: Sprite['name']) {
    const sprites = await this.load();
    return sprites.find((s) => s.name === name);
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    const sprites = x(data['spriteTypes']?.['spriteType']).map((s) => {
      const sprite = new Sprite(this.product);
      return plainToClassFromExist(sprite, s, {
        excludeExtraneousValues: true,
      });
    });
    return sprites as unknown as any[];
  }
}
