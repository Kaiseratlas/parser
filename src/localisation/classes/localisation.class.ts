import type { Product } from '../../core';
import { ProductEntity } from '@shared/';
import type { LocalisationOptions } from '../options';

export class Localisation extends ProductEntity {
  constructor(product: Product, o: LocalisationOptions) {
    super(product);
    this.lang = o.lang;
    this.key = o.key;
    this.value = o.value;
    this.version = o.version ?? 0;
  }

  readonly lang: string;
  readonly key: string;
  readonly value: string;
  readonly version: number;
}
