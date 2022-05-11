import 'reflect-metadata';

export { default as Color } from 'color';
export { Product, Parser as default, Game } from './core';
export {
  Ability,
  AutonomyState,
  Building,
  Bookmark,
  Character,
  CharacterPortrait,
  Country,
  CountryFlag,
  CountryLeader,
  Decision,
  DifficultySetting,
  GameRule,
  FocusTree,
  Focus,
  Ideology,
  Idea,
  IntelligenceAgency,
  OccupationLaw,
  Resource,
  StateCategory,
  Technology,
  Terrain,
  TerrainCategory,
  Unit,
  WarGoal,
} from './common';
export type {
  BookmarkCountry,
  DecisionCategory,
  GameRuleOption,
  TechnologyCategory,
  TechnologySharingGroup,
  // unit types
  UnitGroup,
  Equipment,
  UnitCategory,
} from './common';
export { Event } from './events';
export { Localisation } from './localisation';
export type { GenericManager, ProductEntity, CsvEntityManager } from './shared';
export {
  CountryHistory,
  Division,
  State,
  Faction,
  PoliticalParty,
} from './history';
export type { DivisionTemplate, DivisionTemplateUnit } from './history';
export { Sprite } from './interface';
export { Continent, Province, ProvinceType, StrategicRegion } from './map';
export { ENTITIES } from './core';
