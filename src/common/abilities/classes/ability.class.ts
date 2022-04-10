import { Expose } from 'class-transformer';
import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

/**
 * Ability
 * @category
 */
export class Ability extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }

  static readonly Key = 'ability';

  @Expose()
  protected readonly name: string;

  getName() {
    return this.product.i18n.t({ key: this.name });
  }

  @Expose({ name: 'desc' })
  protected readonly description: string;

  getDescription() {
    return this.product.i18n.t({
      key: this.description,
    });
  }
}
