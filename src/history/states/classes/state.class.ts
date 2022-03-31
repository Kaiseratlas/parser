import { ProductEntity } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import type { Province } from '../../../map';
import { x } from '../../../interface';

export class State extends ProductEntity {
  @Expose()
  readonly id: number;
  readonly name: string;
  @Expose()
  readonly manpower = 0;

  @Expose({ name: 'provinces' })
  @Transform(({ value }) => x(value))
  protected readonly provincesIds: Province['id'][] = [];

  async getProvinces(): Promise<Province[]> {
    const provinces = await this.product.map.provinces.load();
    return provinces.filter((p) => this.provincesIds.includes(p.id));
  }
}
