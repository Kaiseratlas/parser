import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';
import { IdeaSlot } from './idea-slot.class';
import type { Sprite } from '../../../interface';
import { IdeaCategory } from './idea-category.class';

export class Idea extends ProductEntity {
  static readonly Category = IdeaCategory;
  static readonly Slot = IdeaSlot;

  constructor(product: Product, id: Idea['id'], slot: IdeaSlot) {
    super(product);
    this.id = id;
    this.slot = slot;
  }

  readonly id: string;
  readonly slot: IdeaSlot;

  /**
   * Is the cost in political power to add the idea. If not specified, assumed to be 150 political power.
   */
  @Expose()
  readonly cost: number = null;
  /**
   *  is the cost in political power to remove the idea. It is rarely used.
   */
  @Expose({ name: 'removal_cost' })
  readonly removalCost: number = null;

  @Expose()
  readonly name: string;

  getName() {
    return this.product.i18n.t({ key: this.name ?? this.id });
  }

  getDescription() {
    return this.product.i18n.t({ key: `${this.name ?? this.id}_desc` });
  }

  @Expose()
  protected readonly picture: string = null;

  getPicture(): Promise<Sprite | null> {
    if (!this.picture) {
      return null;
    }
    return this.product.interface.sprites.get(
      `GFX_idea_${this.picture ?? this.id}`,
    );
  }
}
