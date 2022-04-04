import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import Color from 'color';

export class StateCategory extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }

  @Expose({ name: 'local_building_slots' })
  readonly localBuildingSlots: number;

  @Expose()
  @Transform(({ value }) => Color.rgb(...value))
  readonly color: Color | null = null;
}
