import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

/**
 * Each unit is assigned a category that is used in technologies to apply effects to group of units at once.
 */
export class UnitCategory extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }
}
