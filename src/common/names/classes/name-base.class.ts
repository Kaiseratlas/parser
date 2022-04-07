import { convertToArray, ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose, Transform } from 'class-transformer';

export class NameBase extends ProductEntity {
  constructor(product: Product, countryTag: string) {
    super(product);
    this.countryTag = countryTag;
  }

  readonly countryTag: string;
  @Expose()
  @Transform(({ value }) => convertToArray(value['names']))
  readonly male: string[] = [];
  @Expose()
  @Transform(({ value }) => convertToArray(value['names']))
  readonly female: string[] = [];
  @Expose()
  @Transform(({ value }) => convertToArray(value))
  readonly surnames: string[] = [];
  @Expose({ name: 'callsigns' })
  @Transform(({ value }) => convertToArray(value))
  readonly callSigns: string[] = [];
}
