import { SpriteManager } from './managers';
import { ProductEntity } from '@shared/';

export class InterfaceManager extends ProductEntity {
  get sprites() {
    return new SpriteManager(this.product);
  }
}
