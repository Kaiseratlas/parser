import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';
import { x } from '../../../interface';
import { IdeaSlot } from './idea-slot.class';

export class IdeaCategory extends ProductEntity {
  static Slot = IdeaSlot;

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
    return new IdeaCategory.Slot(this.product, id);
  }

  get slots(): IdeaSlot[] {
    return this._slots.map(this.makeSlot.bind(this));
  }
}
