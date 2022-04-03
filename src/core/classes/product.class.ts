import type { CommonManager } from '../../common';
import type { HistoryManager } from '../../history';
import type { InterfaceManager } from '../../interface';
import type { MapManager } from '../../map';
import type { LocalisationManager } from '../../localisation';

export abstract class Product {
  constructor(absolutePath: string) {
    this.absolutePath = absolutePath;
  }

  readonly absolutePath: string;

  abstract common: CommonManager;
  abstract history: HistoryManager;
  abstract interface: InterfaceManager;
  abstract localisation: LocalisationManager;
  abstract localization: LocalisationManager;
  abstract map: MapManager;
}
