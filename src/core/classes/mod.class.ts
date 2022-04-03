import { Product } from './product.class';
import { CommonManager } from '../../common';
import { HistoryManager } from '../../history';
import { InterfaceManager } from '../../interface';
import { MapManager } from '../../map';
import { LocalisationManager } from '../../localisation';

export class Mod extends Product {
  get common() {
    return new CommonManager(this);
  }

  get history() {
    return new HistoryManager(this);
  }

  get interface() {
    return new InterfaceManager(this);
  }

  get localisation() {
    return new LocalisationManager(this);
  }

  get localization() {
    return this.localisation;
  }

  get map() {
    return new MapManager(this);
  }
}
