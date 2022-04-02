import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';

export class Resource extends ProductEntity {
  constructor(product: Product, id: Resource['id']) {
    super(product);
    this.id = id;
  }

  readonly id: string;
  @Expose({ name: 'cic' })
  readonly CIC = 0.125;
  @Expose()
  readonly convoys = 0.1;
}
