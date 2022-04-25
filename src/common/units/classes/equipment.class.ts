import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';

export class Equipment extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }

  /**
   * Limits the equipment from appearing before the specified year. Optional
   */
  @Expose()
  readonly year?: number = null; // 4-digit year
  /**
   * GFX reference used to define equipment picture in lend-lease
   */
  @Expose()
  readonly picture: string;
  /**
   * Specifies an entry as an archetype entry. All non-archetype entries inherit
   */
  @Expose({ name: 'is_archetype' })
  readonly isArchetype: boolean = false;
  /**
   * Prevents this equipment from being built.
   */
  @Expose({ name: 'is_buildable' })
  readonly isBuildable: boolean = false;
  /**
   * Determines if this equipment is available without unlocking from a technology.
   */
  @Expose()
  readonly active: boolean = null;

  getName() {
    return this.product.i18n.t({ key: this.id });
  }

  getDescription() {
    return this.product.i18n.t({ key: `${this.id}_desc` });
  }

  getShortName() {
    return this.product.i18n.t({ key: `${this.id}_short` });
  }
}
