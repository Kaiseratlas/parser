import { ProductEntity } from '@shared/';
import {
  ContinentManager,
  ProvinceManager,
  StrategicRegionManager,
} from './managers';

export class MapManager extends ProductEntity {
  readonly continents = new ContinentManager(this.product);
  readonly provinces = new ProvinceManager(this.product);
  readonly strategicRegions = new StrategicRegionManager(this.product);
}
