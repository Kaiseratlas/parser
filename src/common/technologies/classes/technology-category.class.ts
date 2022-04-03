import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

export class TechnologyCategory extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
    this.id = id;
  }
}
