import { CsvEntityManager } from '@shared/';
import { Adjacency } from '../classes';
import { AdjacencyRuleManager } from './adjacency-rule.manager';
import { AdjacencyHeader } from '../enums';
import type csv from 'csv-parser';

export class AdjacencyManager extends CsvEntityManager<Adjacency> {
  protected readonly wildcards = ['map/adjacencies.csv'];

  protected readonly options: csv.Options = {
    skipLines: 1,
  };

  make(): Adjacency {
    return new Adjacency(this.product);
  }

  readonly rules = new AdjacencyRuleManager(this.product);

  async load(o?): Promise<Adjacency[]> {
    return super.load({ nocache: true, ...o });
  }

  protected updateCache(entities: Adjacency[]) {}

  protected async processFile({ path }): Promise<Adjacency[]> {
    const adjacencies = await super.processFile({ path });
    adjacencies.pop();
    return adjacencies;
  }

  protected transformValues({
    index,
    value,
  }: {
    index: AdjacencyHeader;
    value: string;
  }): unknown {
    switch (index) {
      case Adjacency.Header.FROM:
      case Adjacency.Header.TO:
      case Adjacency.Header.THROUGH:
      case Adjacency.Header.START_X:
      case Adjacency.Header.START_Y:
      case Adjacency.Header.STOP_X:
      case Adjacency.Header.STOP_Y: {
        return Number(value);
      }
      case Adjacency.Header.TYPE:
      case Adjacency.Header.ADJACENCY_RULE_NAME:
      case Adjacency.Header.COMMENT:
      default: {
        return value?.length ? value : null;
      }
    }
  }
}
