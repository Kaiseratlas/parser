import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { FocusTree } from './focus-tree.class';
import { Expose } from 'class-transformer';
import type { FocusTreeCountryModifier as Modifier } from './focus-tree-country-modifier.class';

export class FocusTreeCountry extends ProductEntity {
  constructor(product: Product, readonly tree: FocusTree) {
    super(product);
  }

  @Expose()
  readonly factor = 1;

  readonly modifiers: Modifier[] = [];

  addModifier(...modifiers: Modifier[]): FocusTreeCountry {
    this.modifiers.push(...modifiers);
    return this;
  }
}
