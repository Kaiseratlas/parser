import { Product } from '../classes/product.class';
import { ProvinceManager } from './province.manager';

export class MapManager {
  private readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  get provinces() {
    return new ProvinceManager(this.product);
  }
}
