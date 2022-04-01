import { GoalsManager } from './goals/managers/goals.manager';
import { IdeaManager } from './ideas';
import { IdeologyManager } from './ideologies';
import { IntelligenceAgencyManager } from './intelligence-agencies';
import { CharacterManager } from './characters';
import { AbilityManager } from './abilities';
import { AutonomyStateManager } from './autonomous-states';
import { ProductEntity } from '@shared/';
import { IdeaCategoryManager } from './ideas/managers/idea-category.manager';
import { StateCategoryManager } from './state-categories';
import { OpinionModifierManager } from './opinion-modifiers';
import { NameManager } from './names';
import { ResourceManager } from './resources';
import { TechnologyManager } from './technologies';
import { CountryManager } from './countries';

import 'dotenv/config'; // TODO: move to index

export class CommonManager extends ProductEntity {
  readonly abilities = new AbilityManager(this.product);
  readonly autonomousStates = new AutonomyStateManager(this.product);
  readonly characters = new CharacterManager(this.product);
  readonly countries = new CountryManager(this.product);
  readonly goals = new GoalsManager(this.product);
  readonly ideas = new IdeaManager(this.product);
  readonly ideaCategories = new IdeaCategoryManager(this.product);
  readonly ideologies = new IdeologyManager(this.product);
  readonly intelligenceAgencies = new IntelligenceAgencyManager(this.product);
  readonly names = new NameManager(this.product);
  readonly opinionModifiers = new OpinionModifierManager(this.product);
  readonly resources = new ResourceManager(this.product);
  readonly stateCategories = new StateCategoryManager(this.product);
  readonly technologies = new TechnologyManager(this.product);

  get AS() {
    return this.autonomousStates;
  }

  get focuses() {
    return this.goals;
  }

  get IA() {
    return this.intelligenceAgencies;
  }
}
