import { StateManager } from './states';
import { CountryHistoryManager } from './countries';
import { ProductEntity } from '@shared/';

export class HistoryManager extends ProductEntity {
  readonly countries = new CountryHistoryManager(this.product);
  readonly states = new StateManager(this.product);
}
