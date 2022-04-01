import { ProductEntity } from '@shared/';
import { ContinentManager, ProvinceManager } from './managers';

export class MapManager extends ProductEntity {
  get continents() {
    return new ContinentManager(this.product);
  }
  get provinces() {
    return new ProvinceManager(this.product);
  }
}
