import { StateManager } from './states';
import { CountryHistoryManager } from './countries';
import { ProductEntity } from '@shared/';
import { DivisionManager } from './units';

export class HistoryManager extends ProductEntity {
  readonly countries = new CountryHistoryManager(this.product);
  readonly states = new StateManager(this.product);
  readonly divisions = new DivisionManager(this.product);
}
