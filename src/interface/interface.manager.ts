import { SpriteManager } from './managers';
import { Product } from '../shared/classes/product.class';

export class InterfaceManager {
  private readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  get sprites() {
    return new SpriteManager(this.product);
  }
}
