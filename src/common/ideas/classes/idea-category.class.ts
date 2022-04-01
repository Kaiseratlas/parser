import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';
import { x } from '../../../interface';
import { IdeaSlot } from './idea-slot.class';
import { Idea } from './idea.class';

export class IdeaCategory extends ProductEntity {
  @Expose()
  readonly id: string;
  @Expose()
  readonly cost: number | null = null;
  @Expose({ name: 'removal_cost' })
  readonly removalCost: number | null = null;
  @Expose({ name: 'slot' })
  @Transform(({ value }) => x(value))
  protected readonly _slots: string[];

  protected makeSlot(id: IdeaSlot['id']) {
    return new Idea.Slot(this.product, id);
  }

  get slots(): IdeaSlot[] {
    return this._slots.map(this.makeSlot.bind(this));
  }
}
