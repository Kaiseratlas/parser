import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { FocusTreeCountry } from './focus-tree-country.class';
import { Expose } from 'class-transformer';
import type { Country } from '../../countries';

export class FocusTreeCountryModifier extends ProductEntity {
  constructor(product: Product, readonly country: FocusTreeCountry) {
    super(product);
  }

  @Expose()
  readonly add: number;
  @Expose()
  protected readonly tag: Country['tag'];

  getCountry() {
    return this.product.common.countries.get(this.tag);
  }
}
