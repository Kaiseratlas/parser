import { ProductEntity } from '@shared/';
import type { Province } from './province.class';
import { Expose } from 'class-transformer';

export class StrategicRegion extends ProductEntity {
  static readonly Key = 'strategic_region';

  @Expose()
  readonly id: number;
  @Expose()
  protected readonly name: string;
  @Expose({ name: 'provinces' })
  protected readonly provinceIds: Province['id'][] = [];

  getName() {
    return this.product.i18n.t({ key: this.name });
  }

  async getProvinces(): Promise<Province[]> {
    const provinces = await this.product.map.provinces.load();
    return provinces.filter((province) =>
      this.provinceIds.includes(province.id),
    );
  }
}
