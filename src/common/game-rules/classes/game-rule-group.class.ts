import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

export class GameRuleGroup extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }

  getName() {
    return this.product.i18n.t({ key: this.id });
  }
}
