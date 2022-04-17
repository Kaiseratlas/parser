import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

export class WarGoal extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }
}
