import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

export class Continent extends ProductEntity {
  constructor(product: Product, id: Continent['id'], name: Continent['name']) {
    super(product);
    this.id = id;
    this.name = name;
  }
  readonly id: number;
  readonly name: string;
}
