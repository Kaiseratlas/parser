import type { Product } from '../../core';

export class ProductEntity {
  protected readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }
}
