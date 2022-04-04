import { Expose } from 'class-transformer';
import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { FocusTree } from './focus-tree.class';

export class Focus extends ProductEntity {
  static readonly Key = 'focus';

  constructor(product: Product, protected readonly tree: FocusTree) {
    super(product);
  }

  @Expose()
  readonly id: string;
  @Expose()
  protected readonly icon: string;

  getIcon() {
    return this.product.interface.sprites.get(this.icon);
  }

  @Expose()
  readonly x: number;
  @Expose()
  readonly y: number;
  @Expose()
  readonly cost: number;
}
