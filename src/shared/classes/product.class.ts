import { CommonManager } from '../../common/common.manager';
import { EventManager } from '../../events';
import { HistoryManager } from '../../history';
import { InterfaceManager } from '../../interface';
import { MapManager } from '../../map';

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
