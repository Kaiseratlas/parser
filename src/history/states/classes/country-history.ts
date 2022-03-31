import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';
import type { State } from './state.class';
import { CountryPolitics } from './country-politics.class';
import type { Character } from '../../../common';

export class CountryHistory extends ProductEntity {
  @Expose({ name: 'capital' })
  protected readonly capitalId: number;

  @Expose({ name: 'set_research_slots' })
  readonly researchSlots = 0;

  @Expose({ name: 'set_stability' })
  readonly stability = 0;

  @Expose({ name: 'set_war_support' })
  readonly warSupport = 0;

  politics: CountryPolitics;

  makePolitics(): CountryPolitics {
    return new CountryPolitics(this.product);
  }

  setPolitics(politics: CountryPolitics): CountryPolitics {
    return (this.politics = politics);
  }

  @Expose({ name: 'recruit_character' })
  protected readonly charactersIds: Character['id'][];
  protected readonly characters: Character[] | null = null;

  async getCharacters(): Promise<Character[]> {
    const characters = await this.product.common.characters.load();
    return characters.filter((ch) => this.charactersIds.includes(ch.id));
  }

  async getCapital(): Promise<State> {
    return this.product.history.states.get(this.capitalId);
  }
}
