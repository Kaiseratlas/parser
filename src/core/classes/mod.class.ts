import { Product } from './product.class';
import { CommonManager } from '../../common';
import { HistoryManager } from '../../history';
import { InterfaceManager } from '../../interface';
import { MapManager } from '../../map';
import { LocalisationManager } from '../../localisation';
import { EventManager } from '../../events';

export class Mod extends Product {
  readonly common = new CommonManager(this);
  readonly events = new EventManager(this);
  readonly history = new HistoryManager(this);
  readonly interface = new InterfaceManager(this);
  readonly localisation = new LocalisationManager(this);
  readonly map = new MapManager(this);

  get localization() {
    return this.localisation;
  }
}
