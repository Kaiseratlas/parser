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

import 'dotenv/config'; // TODO: move to index

export class CommonManager extends ProductEntity {
  get abilities() {
    return new AbilityManager(this.product);
  }

  get AS() {
    return this.autonomousStates;
  }

  get autonomousStates() {
    return new AutonomyStateManager(this.product);
  }

  get characters() {
    return new CharacterManager(this.product);
  }

  get focuses() {
    return this.goals;
  }

  get goals() {
    return new GoalsManager(this.product);
  }

  get ideas() {
    return new IdeaManager(this.product);
  }

  get ideaCategories() {
    return new IdeaCategoryManager(this.product);
  }

  get ideologies() {
    return new IdeologyManager(this.product);
  }

  get IA() {
    return this.intelligenceAgencies;
  }

  get intelligenceAgencies() {
    return new IntelligenceAgencyManager(this.product);
  }

  get stateCategories() {
    return new StateCategoryManager(this.product);
  }
}
