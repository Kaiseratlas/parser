import { CountryHistoryEntity } from './country-history-entity.class';
import type { Country } from '../../../common/countries';
import { Expose } from 'class-transformer';
import type { AutonomyState as AS } from '../../../common';

export class Autonomy extends CountryHistoryEntity {
  @Expose()
  readonly target: Country['tag'];
  @Expose({ name: 'autonomy_state' })
  protected readonly autonomyStateId: AS['id'];

  getTargetCountry(): Promise<Country> {
    return this.product.common.countries.get(this.target);
  }

  getAutonomyState(): Promise<AS> {
    return this.product.common.autonomousStates.get(this.autonomyStateId);
  }
}
