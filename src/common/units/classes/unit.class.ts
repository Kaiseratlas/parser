import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

export class Unit extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }
}
