import { Product } from './product.class';

export class ProductEntity {
  protected readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }
}
