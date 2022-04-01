import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

export class Faction extends ProductEntity {
  constructor(product: Product, id: Faction['id']) {
    super(product);
    this.id = id;
  }

  readonly id: string;
}
