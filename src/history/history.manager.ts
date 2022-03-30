import { CountryHistoryManager, StateManager } from './states';
import { Product } from '@shared/';

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
