import { Product } from '@shared/';
import type { Ideology } from '../../../common';
import type { CountryHistory } from './country-history';
import { CountryHistoryEntity } from './country-history-entity.class';

export class PoliticalParty extends CountryHistoryEntity {
  constructor(
    product: Product,
    history: CountryHistory,
    ideologyId: Ideology['id'],
  ) {
    super(product, history);
    this.ideologyId = ideologyId;
  }

  readonly ideologyId: Ideology['id'];

  getIdeology(): Promise<Ideology> {
    return this.product.common.ideologies.get(this.ideologyId);
  }

  get popularity(): number {
    return this.history.getIdeologyPopularity(this.ideologyId);
  }
}
