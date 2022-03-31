import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';

export class StateCategory extends ProductEntity {
  @Expose()
  readonly id: string;

  @Expose({ name: 'local_building_slots' })
  readonly localBuildingSlots: number;
}
