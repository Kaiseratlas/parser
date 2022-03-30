import { Expose, Transform } from 'class-transformer';
import { Product } from './product.class';
import fs from 'fs';
import path from 'path';

export class Sprite {
  protected readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  @Expose()
  name: string;
  @Expose({ name: 'texturefile' })
  @Transform(({ obj, value }) => value ?? obj['textureFile'])
  textureFile: string;

  protected get textureFilePath() {
    return path.join(this.product.absolutePath, this.textureFile);
  }

  readFile() {
    return fs.promises.readFile(this.textureFilePath);
  }
}
