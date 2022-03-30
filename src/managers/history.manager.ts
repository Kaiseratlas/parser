import { CountryHistoryManager } from './country-history.manager';
import { StateManager } from './state.manager';
import { Product } from '../classes/product.class';

export class HistoryManager {
  private readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  get countries() {
    return new CountryHistoryManager(this.product);
  }

  get states() {
    return new StateManager(this.product);
  }
}
