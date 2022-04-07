import { ProductEntity } from '@shared/';
import {
  AdjacencyManager,
  ContinentManager,
  ProvinceManager,
  StrategicRegionManager,
} from './managers';

export class MapManager extends ProductEntity {
  readonly adjacencies = new AdjacencyManager(this.product);
  readonly continents = new ContinentManager(this.product);
  readonly provinces = new ProvinceManager(this.product);
  readonly strategicRegions = new StrategicRegionManager(this.product);
}
