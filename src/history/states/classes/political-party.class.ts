import { Product, ProductEntity } from '@shared/';
import type { Ideology } from '../../../common';
import type { CountryHistory } from './country-history';

export class PoliticalParty extends ProductEntity {
  constructor(
    product: Product,
    history: CountryHistory,
    ideologyId: Ideology['id'],
  ) {
    super(product);
    this.history = history;
    this.ideologyId = ideologyId;
  }

  protected readonly history: CountryHistory;
  protected readonly ideologyId: Ideology['id'];

  getIdeology(): Promise<Ideology> {
    return this.product.common.ideologies.get(this.ideologyId);
  }

  get popularity(): number {
    return this.history.getIdeologyPopularity(this.ideologyId);
  }
}
