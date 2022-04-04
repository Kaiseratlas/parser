import type { Product } from '../../core';

export class ProductEntity {
  protected readonly product: Product;
  readonly id: string | number;

  constructor(product: Product) {
    this.product = product;
  }
}
