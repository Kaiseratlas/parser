import { Product } from '@shared/';
import { ProvinceManager } from './managers';

export class MapManager {
  private readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  get provinces() {
    return new ProvinceManager(this.product);
  }
}
