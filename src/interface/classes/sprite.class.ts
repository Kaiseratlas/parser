import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TGA from 'tga';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { convert } from 'imagemagick-convert';

export class Sprite extends ProductEntity {
  static readonly Key = 'spriteType';

  constructor(product: Product, textureFile?: Sprite['textureFile']) {
    super(product);
    this.textureFile = textureFile;
  }

  @Expose({ name: 'name' })
  readonly id: string | null = null;

  @Expose({ name: 'textureFile' }) // TODO: !
  @Transform(({ obj }) => obj['texturefile'] ?? obj['textureFile'])
  @Transform(({ value }: { value: string }) => value?.replace(/\/{2,}/g, '/'))
  readonly textureFile: string;

  /**
   * Is used for images with multiple frames within,
   * for example GFX_unit_level has five images within for each of the unit level images,
   * and so would have noOfFrames = 5 set within its asset definition.
   */
  @Expose({ name: 'noOfFrames' }) // !
  @Transform(({ obj }) => obj['noOfFrames'] ?? obj['noofframes'])
  readonly noOfFrames: number = 0;

  protected get textureFilePath() {
    return this.product.resolve(this.textureFile);
  }

  get png() {
    return {
      toBuffer: async () => {
        const data = await this.readFile();
        switch (path.parse(this.textureFile).ext) {
          case '.dds': {
            return convert({
              srcData: data,
              srcFormat: 'DDS',
              format: 'PNG',
            });
          }
          case '.png': {
            return data;
          }
          case '.tga': {
            const tga = new TGA(data);
            const png = new PNG({
              width: tga.width,
              height: tga.height,
            });
            png.data = tga.pixels;
            return PNG.sync.write(png);
          }
        }
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
