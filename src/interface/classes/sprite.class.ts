import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TGA from 'tga';

export class Sprite extends ProductEntity {
  @Expose()
  readonly name: string;
  @Expose({ name: 'texturefile' })
  @Transform(({ obj, value }) => value ?? obj['textureFile'])
  readonly textureFile: string;

  protected get textureFilePath() {
    return path.join(this.product.absolutePath, this.textureFile);
  }

  get png() {
    return {
      toBuffer: async () => {
        const data = await this.readFile();
        const tga = new TGA(data);
        const png = new PNG({
          width: tga.width,
          height: tga.height,
        });
        png.data = tga.pixels;
        return PNG.sync.write(png);
      },
    };
  }

  get tga() {
    return {
      toBuffer: async () => {
        const data = await this.readFile();
        const tga = new TGA(data);
        return TGA.createTgaBuffer(tga.width, tga.height, tga.pixels);
      },
    };
  }

  readFile() {
    return fs.promises.readFile(this.textureFilePath);
  }
}
