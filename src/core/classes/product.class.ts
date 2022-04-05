import type { CommonManager } from '../../common';
import type { HistoryManager } from '../../history';
import type { InterfaceManager } from '../../interface';
import type { MapManager } from '../../map';
import type { LocalisationManager } from '../../localisation';
import type { EventManager } from '../../events';
import type { Game } from './game.class';
import type { Mod } from './mod.class';

export abstract class Product {
  protected constructor(
    protected readonly game: Game,
    protected readonly mods: Mod[],
  ) {}

  abstract common: CommonManager;
  abstract events: EventManager;
  abstract history: HistoryManager;
  abstract interface: InterfaceManager;
  abstract i18n: LocalisationManager;
  abstract localisation: LocalisationManager;
  abstract localization: LocalisationManager;
  abstract map: MapManager;
  abstract fg(wildcards: string[]): Promise<any>;
  abstract resolve(...paths: string[]): string;
}
