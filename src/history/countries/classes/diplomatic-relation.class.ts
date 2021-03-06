import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';
import type { Country } from '../../../common/countries';
import type { OpinionModifier } from '../../../common';

export class DiplomaticRelation extends ProductEntity {
  @Expose({ name: 'country' })
  protected readonly countryTag: Country['tag'];
  @Expose()
  protected readonly relation: OpinionModifier['id'];
  @Expose({ name: 'active' })
  protected readonly isActive = true;

  getCountry(): Promise<Country> {
    return this.product.common.countries.get(this.countryTag);
  }

  getRelation(): Promise<OpinionModifier> {
    return this.product.common.opinionModifiers.get(this.relation);
  }
}
