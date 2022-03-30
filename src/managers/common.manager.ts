import { GoalsManager } from './goals.manager';
import { IdeaManager } from './idea.manager';
import { IdeologyManager } from './ideology.manager';
import { IntelligenceAgencyManager } from './intelligence-agency.manager';
import { CharacterManager } from '../common/characters/managers/character.manager';
import { AbilityManager } from './ability.manager';
import { AutonomyStateManager } from './autonomy-state.manager';
import { Product } from '../classes/product.class';
import { IdeaCategoryManager } from './idea-category.manager';

import 'dotenv/config';

export class CommonManager {
  private readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }

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
}
