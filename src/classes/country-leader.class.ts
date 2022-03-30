import { Product } from './product.class';
import { Expose, Transform } from 'class-transformer';

export class CountryLeader {
  protected readonly product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  @Expose()
  readonly ideology: string;

  @Expose({ name: 'desc' })
  @Transform(({ value }) => value ?? null)
  readonly description: string | null;
}
