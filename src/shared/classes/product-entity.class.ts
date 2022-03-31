import type { Product } from '../../core/classes/product.class';

export class ProductEntity {
  protected readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }
}
