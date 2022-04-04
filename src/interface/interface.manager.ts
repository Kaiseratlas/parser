import { SpriteManager } from './managers';
import { ProductEntity } from '@shared/';

export class InterfaceManager extends ProductEntity {
  readonly sprites = new SpriteManager(this.product);
}
