import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { NameBase } from '../../names';
import type { CountryHistory } from '../../../history';
import type { CountryColor } from './country-color.class';
import { CountryFlag } from './country-flag.class';
import { CountryFlagManager } from '../managers/country-flag.manager';

export class Country extends ProductEntity {
  static Flag = CountryFlag;

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

  get flags() {
    return new CountryFlagManager(this.product, this);
  }

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
