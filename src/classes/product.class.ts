import { CommonManager } from '../managers/common.manager';
import { EventManager } from '../managers/event.manager';
import { HistoryManager } from '../history/states/managers/history.manager';
import { InterfaceManager } from '../managers/interface.manager';
import { MapManager } from '../managers/map.manager';

export class Product {
  constructor(absolutePath: string) {
    this.absolutePath = absolutePath;
  }

  readonly absolutePath: string;

  get common() {
    return new CommonManager(this);
  }

  get events() {
    return new EventManager(this);
  }

  get history() {
    return new HistoryManager(this);
  }

  get interface() {
    return new InterfaceManager(this);
  }

  get map() {
    return new MapManager(this);
  }
}
