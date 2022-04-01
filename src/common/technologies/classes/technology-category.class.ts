import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

export class TechnologyCategory extends ProductEntity {
  constructor(product: Product, id: TechnologyCategory['id']) {
    super(product);
    this.id = id;
  }
  readonly id: string;
}
