import { convertToArray, ProductEntity } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import { Province } from './province.class';

export class AdjacencyRule extends ProductEntity {
  @Expose({ name: 'name' })
  readonly id: string;
  @Expose()
  protected readonly icon: number;
  @Expose({ name: 'required_provinces' })
  @Transform(({ value }) => convertToArray(value))
  protected readonly requiredProvinces: Province['id'][] = [];
  @Expose()
  @Transform(({ value }) => convertToArray(value))
  protected readonly offset: number[] = [];

  getName() {
    return this.product.i18n.t({ key: this.id });
  }
}
