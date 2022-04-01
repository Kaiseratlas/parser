import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';
import { IdeaSlot } from './idea-slot.class';
import type { Sprite } from '../../../interface';

export class Idea extends ProductEntity {
  static Slot = IdeaSlot;

  constructor(product: Product, id: Idea['id'], slot: IdeaSlot) {
    super(product);
    this.id = id;
    this.slot = slot;
  }

  readonly id: string;
  readonly slot: IdeaSlot;

  @Expose()
  protected readonly picture: string | null = null;

  getPicture(): Promise<Sprite | null> {
    if (!this.picture) {
      return null;
    }
    return this.product.interface.sprites.get(`GFX_idea_${this.picture}`);
  }
}
