import type { Product } from '@shared/';
import { ProductEntity } from '@shared/';
import type { CountryHistory } from './country-history';

export class CountryHistoryEntity extends ProductEntity {
  constructor(product: Product, history: CountryHistory) {
    super(product);
    this.history = history;
  }

  protected readonly history: CountryHistory;
}
