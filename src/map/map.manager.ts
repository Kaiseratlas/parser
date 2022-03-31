import { ProductEntity } from '@shared/';
import { ProvinceManager } from './managers';

export class MapManager extends ProductEntity {
  get provinces() {
    return new ProvinceManager(this.product);
  }
}
