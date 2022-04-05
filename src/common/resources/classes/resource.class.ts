import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';
import type { Localisation } from '../../../localisation';

/**
 * Resource
 */
export class Resource extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
    this.id = id;
  }

  /**
   * Defines the amount of resources needed to trade for 1 Civilian Factory.
   * By default, this is 0.125, meaning 8 units of that resource are traded for 1 factory.
   */
  @Expose({ name: 'cic' })
  readonly CIC = 0.125;
  /**
   * Convoys controls the maximum amount of this resource a single convoy carries.
   * By default, this is 0.1, meaning a convoy can carry 10 of the resource.
   */
  @Expose()
  readonly convoys = 0.1;

  /**
   * Get a name of resource
   */
  getName(): Promise<Localisation> {
    return this.product.i18n.t({
      key: `PRODUCTION_MATERIALS_${this.id.toUpperCase()}`,
    });
  }

  /**
   * Get a description of resource
   */
  getDescription(): Promise<Localisation> {
    return this.product.i18n.t({ key: `${this.id}_desc` });
  }
}
