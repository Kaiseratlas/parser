import { StateManager } from './states';
import { CountryHistoryManager } from './countries';
import { ProductEntity } from '@shared/';

export class HistoryManager extends ProductEntity {
  get countries() {
    return new CountryHistoryManager(this.product);
  }

  get states() {
    return new StateManager(this.product);
  }
}
