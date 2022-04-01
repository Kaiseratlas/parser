import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import { x } from '../../../interface';

export class NameBase extends ProductEntity {
  constructor(product: Product, countryTag: string) {
    super(product);
    this.countryTag = countryTag;
  }

  readonly countryTag: string;
  @Expose()
  @Transform(({ value }) => x(value['names']))
  readonly male: string[] = [];
  @Expose()
  @Transform(({ value }) => x(value['names']))
  readonly female: string[] = [];
  @Expose()
  @Transform(({ value }) => x(value))
  readonly surnames: string[] = [];
  @Expose({ name: 'callsigns' })
  @Transform(({ value }) => x(value))
  readonly callSigns: string[] = [];
}
