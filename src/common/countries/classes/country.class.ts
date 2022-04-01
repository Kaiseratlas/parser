import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { NameBase } from '../../names';
import type { CountryHistory } from '../../../history';
import type { CountryColor } from './country-color.class';

export class Country extends ProductEntity {
  constructor(
    product: Product,
    countryTag: Country['tag'],
    isDynamic: Country['isDynamic'],
  ) {
    super(product);
    this.tag = countryTag;
    this.isDynamic = isDynamic;
  }

  readonly tag: string;
  readonly isDynamic: boolean;

  getColor(): Promise<CountryColor> {
    return this.product.common.countries.colors.get(this.tag);
  }

  getNames(): Promise<NameBase> {
    return this.product.common.names.get(this.tag);
  }

  getHistory(): Promise<CountryHistory> {
    return this.product.history.countries.get(this.tag);
  }
}
