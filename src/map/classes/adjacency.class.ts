import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';
import type { AdjacencyRule } from './adjacency-rule.class';
import type { Province } from './province.class';
import { AdjacencyHeader } from '../enums';

export class Adjacency extends ProductEntity {
  static readonly Header = AdjacencyHeader;

  @Expose({ name: '0' })
  readonly from: Province['id'];

  getFromProvince() {
    return this.product.map.provinces.get(this.from);
  }

  @Expose({ name: '1' })
  readonly to: Province['id'];

  getToProvince() {
    return this.product.map.provinces.get(this.to);
  }

  @Expose({ name: '2' })
  readonly type: string;
  @Expose({ name: '3' })
  readonly through: number;
  @Expose({ name: '4' })
  readonly startX: number;
  @Expose({ name: '5' })
  readonly startY: number;
  @Expose({ name: '6' })
  readonly stopX: number;
  @Expose({ name: '7' })
  readonly stopY: number;
  @Expose({ name: '8' })
  protected readonly adjacencyRuleName: AdjacencyRule['id'];

  getAdjacencyRule(): Promise<AdjacencyRule> {
    return this.product.map.adjacencies.rules.get(this.adjacencyRuleName);
  }

  @Expose({ name: '9' })
  readonly comment: string | null = null;
}
