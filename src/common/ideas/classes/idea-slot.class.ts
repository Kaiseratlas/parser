import { ProductEntity } from '@shared/';
import type { Product } from '../../../core';
import { Expose } from 'class-transformer';
import { Sprite } from '../../../interface';

export class IdeaSlot extends ProductEntity {
  constructor(product: Product, id: IdeaSlot['id']) {
    super(product);
    this.id = id;
  }

  @Expose()
  readonly id: string;

  getIcon(): Promise<Sprite> {
    return this.product.interface.sprites.get(`GFX_idea_slot_${this.id}`);
  }
}
