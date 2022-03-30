import { ProductEntity } from './product-entity.class';
import { Expose, Transform } from 'class-transformer';
import { Province } from './province.class';
import { x } from '../managers/sprite.manager';

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
