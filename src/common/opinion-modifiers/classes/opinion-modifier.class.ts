import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';

export class OpinionModifier extends ProductEntity {
  constructor(product: Product, id: OpinionModifier['id']) {
    super(product);
    this.id = id;
  }

  readonly id: string;

  @Expose()
  readonly trade = false;
  @Expose()
  readonly target = false; // TODO: ?
  @Expose()
  readonly value: number;
  @Expose({ name: 'min_trust' })
  readonly minTrust = -Infinity;
  @Expose({ name: 'max_trust' })
  readonly maxTrust = Infinity;
  @Expose()
  readonly days: number;
  @Expose()
  readonly months: number;
  @Expose()
  readonly years: number;
  @Expose()
  readonly decay: number;
}
