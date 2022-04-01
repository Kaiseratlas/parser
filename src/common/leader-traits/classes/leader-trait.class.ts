import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

export class LeaderTrait extends ProductEntity {
  constructor(product: Product, id: LeaderTrait['id']) {
    super(product);
    this.id = id;
  }
  readonly id: string;
}
