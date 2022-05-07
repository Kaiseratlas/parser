import { GoalsManager } from './goals';
import { IdeaManager } from './ideas';
import { IdeologyManager } from './ideologies';
import { IntelligenceAgencyManager } from './intelligence-agencies';
import { CharacterManager } from './characters';
import { AbilityManager } from './abilities';
import { AutonomyStateManager } from './autonomous-states';
import { ProductEntity } from '@shared/';
import { StateCategoryManager } from './state-categories';
import { OpinionModifierManager } from './opinion-modifiers';
import { NameManager } from './names';
import { ResourceManager } from './resources';
import { TechnologyManager } from './technologies';
import { CountryManager } from './countries';
import { LeaderTraitManager } from './leader-traits';
import { BuildingManager } from './buildings';
import { TerrainManager } from './terrain';
import { DecisionManager } from './decisions';
import { GameRuleManager } from './game-rules';
import { DifficultySettingManager } from './difficulty-settings';
import { BookmarkManager } from './bookmarks';
import { UnitManager } from './units';
import { OccupationLawManager } from './occupation-laws';
import { WarGoalManager } from './war-goals';

export class CommonManager extends ProductEntity {
  readonly abilities = new AbilityManager(this.product);
  readonly autonomousStates = new AutonomyStateManager(this.product);
  readonly buildings = new BuildingManager(this.product);
  readonly bookmarks = new BookmarkManager(this.product);
  readonly characters = new CharacterManager(this.product);
  readonly countries = new CountryManager(this.product);
  readonly decisions = new DecisionManager(this.product);
  readonly difficultySettings = new DifficultySettingManager(this.product);
  readonly gameRules = new GameRuleManager(this.product);
  readonly goals = new GoalsManager(this.product);
  readonly ideas = new IdeaManager(this.product);
  readonly ideologies = new IdeologyManager(this.product);
  readonly intelligenceAgencies = new IntelligenceAgencyManager(this.product);
  readonly leaderTraits = new LeaderTraitManager(this.product);
  readonly names = new NameManager(this.product);
  readonly occupationLaws = new OccupationLawManager(this.product);
  readonly opinionModifiers = new OpinionModifierManager(this.product);
  readonly resources = new ResourceManager(this.product);
  readonly stateCategories = new StateCategoryManager(this.product);
  readonly technologies = new TechnologyManager(this.product);
  readonly terrain = new TerrainManager(this.product);
  readonly units = new UnitManager(this.product);
  readonly warGoals = new WarGoalManager(this.product);

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
