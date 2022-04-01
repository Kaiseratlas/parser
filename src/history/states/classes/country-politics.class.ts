import { Expose } from 'class-transformer';
import type { PoliticalParty } from './political-party.class';
import { CountryHistoryEntity } from './country-history-entity.class';

export class CountryPolitics extends CountryHistoryEntity {
  @Expose({ name: 'ruling_party' })
  protected readonly rulingPartyIdeologyId = 'paternal_autocrat';
  @Expose({ name: 'last_election' })
  readonly lastElection: Date;
  @Expose({ name: 'election_frequency' })
  readonly electionFrequency: number;
  @Expose({ name: 'elections_allowed' })
  readonly electionsAllowed: boolean;

  get rulingParty(): PoliticalParty {
    return this.history.getPoliticalParty(this.rulingPartyIdeologyId);
  }
}
