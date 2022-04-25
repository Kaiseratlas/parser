import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { Localisation } from '../../../localisation';

export class UnitGroup extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }
  getName(): Promise<Localisation> {
    return this.product.i18n.t({ key: this.id });
  }
}
