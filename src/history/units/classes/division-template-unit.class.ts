import { ProductEntity } from '@shared/';
import type { Unit } from '../../../common';
import type { Product } from '@shared/';

export class DivisionTemplateUnit extends ProductEntity {
  constructor(
    product: Product,
    protected readonly unitId: Unit['id'],
    readonly x: number,
    readonly y: number,
  ) {
    super(product);
  }

  getUnit(): Promise<Unit> {
    return this.product.common.units.get(this.unitId);
  }
}
