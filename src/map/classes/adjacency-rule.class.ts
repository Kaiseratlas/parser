import { ProductEntity, TransformToArray } from '@shared/';
import { Expose } from 'class-transformer';
import { Province } from './province.class';

export class AdjacencyRule extends ProductEntity {
  @Expose({ name: 'name' })
  readonly id: string;
  @Expose()
  protected readonly icon: number;
  @Expose({ name: 'required_provinces' })
  @TransformToArray()
  protected readonly requiredProvinces: Province['id'][] = [];
  @Expose()
  @TransformToArray()
  protected readonly offset: number[] = [];

  getName() {
    return this.product.i18n.t({ key: this.id });
  }
}
