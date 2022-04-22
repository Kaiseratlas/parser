import { GenericManager } from '@shared/';
import {
  Ability,
  AutonomyState,
  Building,
  Character,
  Country,
  Decision,
  FocusTree, GameRule,
  Ideology,
  IntelligenceAgency,
  OpinionModifier,
  Resource,
  StateCategory,
  Technology,
  TerrainCategory,
} from '../common';
import { Parser } from './classes';
import { State } from '../history';
import { Sprite } from '../interface';
import { Continent, Province, StrategicRegion } from '../map';
import { Localisation } from '../localisation';
import { Event } from '../events';

const entries: Array<[string, (parser: Parser) => GenericManager<any>]> = [
  // Common
  [Ability.name, (parser) => parser.common.abilities],
  [AutonomyState.name, (parser) => parser.common.autonomousStates],
  [Building.name, (parser) => parser.common.buildings],
  [Character.name, (parser) => parser.common.characters],
  [Country.name, (parser) => parser.common.countries],
  [Country.Flag.name, (parser) => parser.common.countries.flags],
  [Decision.name, (parser) => parser.common.decisions],
  [Decision.Category.name, (parser) => parser.common.decisions.categories],
  [FocusTree.name, (parser) => parser.common.focuses],
  [GameRule.name, (parser) => parser.common.gameRules],
  [Ideology.name, (parser) => parser.common.ideologies],
  [IntelligenceAgency.name, (parser) => parser.common.IA],
  [OpinionModifier.name, (parser) => parser.common.opinionModifiers],
  [Resource.name, (parser) => parser.common.resources],
  [StateCategory.name, (parser) => parser.common.stateCategories],
  [Technology.name, (parser) => parser.common.technologies],
  [Technology.Category.name, (parser) => parser.common.technologies.categories],
  [
    Technology.SharingGroup.name,
    (parser) => parser.common.technologies.sharingGroups,
  ],
  [TerrainCategory.name, (parser) => parser.common.terrain.categories],
  // Events
  [Event.name, (parser) => parser.events],
  // History
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