import { convertToArray, GenericManager } from '@shared/';
import { Sprite } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class SpriteManager extends GenericManager<Sprite> {
  protected readonly wildcards = ['interface/**/*.gfx'];

  make(textureFile?: Sprite['textureFile']): Sprite {
    return new Sprite(this.product, textureFile);
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    const sprites = [
      ...convertToArray(data['spriteTypes']?.[Sprite.Key]),
      ...convertToArray(data['spriteTypes']?.['SpriteType']),
    ].map((s) =>
      plainToClassFromExist(this.make(), s, {
        excludeExtraneousValues: true,
        exposeDefaultValues: false,
      }),
    );
    return sprites as unknown as any[];
  }
}
