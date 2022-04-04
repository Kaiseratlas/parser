import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { FocusTree } from './focus-tree.class';
import { x } from '../../../interface';

export class Focus extends ProductEntity {
  static readonly Key = 'focus';

  constructor(product: Product, protected readonly tree: FocusTree) {
    super(product);
  }

  @Expose()
  readonly id: string;

  getName() {
    return this.product.localisation.get(this.id);
  }

  getDescription() {
    return this.product.localisation.get(`${this.id}_desc`);
  }

  @Expose()
  protected readonly icon: string;

  getIcon() {
    return this.product.interface.sprites.get(this.icon);
  }

  @Expose()
  @Transform(({ value }) => new Set(x(value?.['focus'])))
  protected readonly prerequisiteFocusIds = new Set<Focus['id']>();

  get prerequisite(): Focus[] {
    return [...this.prerequisiteFocusIds.values()].map((focusId) =>
      this.tree.getFocus(focusId),
    );
  }

  @Expose()
  readonly x: number;
  @Expose()
  readonly y: number;
  @Expose()
  readonly cost: number;
}
