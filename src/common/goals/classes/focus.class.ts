import { Expose, Transform } from 'class-transformer';
import { convertToArray, ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { FocusTree } from './focus-tree.class';

export class Focus extends ProductEntity {
  static readonly Key = 'focus';

  constructor(product: Product, protected readonly tree: FocusTree) {
    super(product);
  }

  /**
   * The focus id. This can be any string you want.
   */
  @Expose()
  readonly id: string;

  getName() {
    return this.product.localisation.get(this.id);
  }

  getDescription() {
    return this.product.localisation.get(`${this.id}_desc`);
  }

  /**
   * The picture that goes with the focus. The name is defined in goals.gfx in /Hearts of Iron IV/interface. To create a custom one you must follow the formatting in goals.gfx and add a shine in goals_shine.gfx in the same directory.
   * @protected
   */
  @Expose()
  protected readonly icon: string;

  getIcon() {
    return this.product.interface.sprites.get(this.icon);
  }

  @Expose()
  @Transform(({ value }) => new Set(convertToArray(value?.['focus'])))
  protected readonly prerequisiteFocusIds = new Set<Focus['id']>();

  get prerequisite(): Focus[] {
    return [...this.prerequisiteFocusIds.values()].map((focusId) =>
      this.tree.getFocus(focusId),
    );
  }

  @Expose()
  /**
   * The position on the focus tree horizontally.
   */
  readonly x: number;
  /**
   * The position on the focus tree vertically.
   */
  @Expose()
  readonly y: number;
  /**
   * How long the focus takes to complete.
   * By default, it increases in sevens, so 1 would be 7 days, 10 would be 70 days, etc. Editable in the defines
   */
  @Expose()
  readonly cost: number;
}
