import { GenericManager } from '@shared/';
import {
  Ability,
  AutonomyState,
  Bookmark,
  Building,
  Character,
  Country,
  Decision,
  DifficultySetting,
  Focus,
  FocusTree,
  GameRule,
  Idea,
  Ideology,
  IntelligenceAgency,
  OccupationLaw,
  OpinionModifier,
  Resource,
  StateCategory,
  Technology,
  TerrainCategory,
  Unit,
  WarGoal,
} from '../common';
import { Parser } from './classes';
import { CountryHistory, Division, State } from '../history';
import { Sprite } from '../interface';
import { Continent, Province, StrategicRegion } from '../map';
import { Localisation } from '../localisation';
import { Event } from '../events';

export const ENTITIES = [
  // Common
  Ability,
  AutonomyState,
  Bookmark,
  Building,
  Character,
  Country,
  Country.Flag,
  Decision,
  Decision.Category,
  DifficultySetting,
  Focus,
  FocusTree,
  GameRule,
  Idea,
  Ideology,
  IntelligenceAgency,
  OccupationLaw,
  OpinionModifier,
  Resource,
  StateCategory,
  Technology,
  Technology.Category,
  Unit,
  Unit.Category,
  Unit.Equipment,
  WarGoal,
  // Events
  Event,
  // History
  CountryHistory,
  Division,
  Division.Template,
  State,
  // Interface
  Sprite,
  // Localisations
  Localisation,
  // Map
  Continent,
  Province,
  StrategicRegion,
];

const entries: Array<[string, (parser: Parser) => GenericManager<any>]> = [
  // Common
  [Ability.name, (parser) => parser.common.abilities],
  [AutonomyState.name, (parser) => parser.common.autonomousStates],
  [Building.name, (parser) => parser.common.buildings],
  [Bookmark.name, (parser) => parser.common.bookmarks],
  [Character.name, (parser) => parser.common.characters],
  [Country.name, (parser) => parser.common.countries],
  [Country.Flag.name, (parser) => parser.common.countries.flags],
  [Decision.name, (parser) => parser.common.decisions],
  [Decision.Category.name, (parser) => parser.common.decisions.categories],
  [DifficultySetting.name, (parser) => parser.common.difficultySettings],
  [Focus.name, (parser) => parser.common.focuses],
  [FocusTree.name, (parser) => parser.common.focuses.trees],
  [GameRule.name, (parser) => parser.common.gameRules],
  [Idea.name, (parser) => parser.common.ideas],
  [Ideology.name, (parser) => parser.common.ideologies],
  [IntelligenceAgency.name, (parser) => parser.common.IA],
  [OccupationLaw.name, (parser) => parser.common.occupationLaws],
  [OpinionModifier.name, (parser) => parser.common.opinionModifiers],
  [Resource.name, (parser) => parser.common.resources],
  [StateCategory.name, (parser) => parser.common.stateCategories],
  [Technology.name, (parser) => parser.common.technologies],
  [Technology.Category.name, (parser) => parser.common.technologies.categories],
  [Unit.name, (parser) => parser.common.units],
  [Unit.Category.name, (parser) => parser.common.units.categories],
  [Unit.Equipment.name, (parser) => parser.common.units.equipments],
  [WarGoal.name, (parser) => parser.common.warGoals],
  [
    Technology.SharingGroup.name,
    (parser) => parser.common.technologies.sharingGroups,
  ],
  [TerrainCategory.name, (parser) => parser.common.terrain.categories],
  // Events
  [Event.name, (parser) => parser.events],
  // History
  [CountryHistory.name, (parser) => parser.history.countries],
  [Division.name, (parser) => parser.history.divisions],
  [Division.Template.name, (parser) => parser.history.divisions.templates],
  [State.name, (parser) => parser.history.states],
  // Interface
  [Sprite.name, (parser) => parser.interface.sprites],
  // Localisations
  [Localisation.name, (parser) => parser.i18n],
  // Map
  [Continent.name, (parser) => parser.map.continents],
  [Province.name, (parser) => parser.map.provinces],
  [StrategicRegion.name, (parser) => parser.map.strategicRegions],
];

export const managerSelectors = new Map(entries);
