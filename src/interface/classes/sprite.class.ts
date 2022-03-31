import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';
import fs from 'fs';
import path from 'path';

export class Sprite extends ProductEntity {
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
