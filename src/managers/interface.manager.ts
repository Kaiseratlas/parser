import { SpriteManager } from './sprite.manager';
import { Product } from '../classes/product.class';

export class InterfaceManager {
  private readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  get sprites() {
    return new SpriteManager(this.product);
  }
}
