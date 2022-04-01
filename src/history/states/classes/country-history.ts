import { ProductEntity } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import type { State } from './state.class';
import { CountryPolitics } from './country-politics.class';
import type { Character } from '../../../common';
import type { DiplomaticRelation } from './diplomatic-relation.class';
import type { Ideology } from '../../../common';
import { PoliticalParty } from './political-party.class';
import type { Idea } from '../../../common';
import { x } from '../../../interface';

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
  readonly diplomaticRelations: DiplomaticRelation[] = [];

  makePolitics(): CountryPolitics {
    return new CountryPolitics(this.product);
  }

  setPolitics(politics: CountryPolitics): CountryPolitics {
    return (this.politics = politics);
  }

  addDiplomaticRelation(...relations: DiplomaticRelation[]) {
    return this.diplomaticRelations.push(...relations);
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

  @Expose({ name: 'set_popularities' })
  @Transform(({ value }) => {
    const ratings = new Map();
    Object.entries<Record<Ideology['id'], number>>(value).forEach(
      ([ideologyId, popularity]) => ratings.set(ideologyId, popularity),
    );
    return ratings;
  })
  protected ratings = new Map<Ideology['id'], number>();

  getIdeologyPopularity(ideologyId: Ideology['id']) {
    return this.ratings.get(ideologyId);
  }

  get parties() {
    return Array.from(this.ratings).map(
      ([ideologyId]) => new PoliticalParty(this.product, this, ideologyId),
    );
  }

  @Expose({ name: 'add_ideas' })
  @Transform(({ value }) => x(value))
  protected readonly ideas: Idea['id'][];

  async getIdeas(): Promise<Idea[]> {
    const ideas = await this.product.common.ideas.load();
    return ideas.filter((idea) => this.ideas.includes(idea.id));
  }
}
