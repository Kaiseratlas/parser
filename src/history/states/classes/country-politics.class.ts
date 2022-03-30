import { ProductEntity } from '../../../classes/product-entity.class';
import { Expose } from 'class-transformer';

export class CountryPolitics extends ProductEntity {
  @Expose({ name: 'ruling_party' })
  rulingParty = 'paternal_autocrat';
  @Expose({ name: 'last_election' })
  lastElection: Date;
  @Expose({ name: 'election_frequency' })
  electionFrequency: number;
  @Expose({ name: 'elections_allowed' })
  electionsAllowed: boolean;
}
