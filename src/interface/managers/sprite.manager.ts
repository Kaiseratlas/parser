import { GenericManager } from '@shared/';
import { Sprite } from '../classes';
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

  make(textureFile?: Sprite['textureFile']) {
    return new Sprite(this.product, textureFile);
  }

  async get(name: Sprite['name']) {
    const sprites = await this.load();
    return sprites.find((s) => s.name === name);
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    const sprites = x(data['spriteTypes']?.['spriteType']).map((s) =>
      plainToClassFromExist(this.make(), s, {
        excludeExtraneousValues: true,
        exposeDefaultValues: false,
      }),
    );
    return sprites as unknown as any[];
  }
}
