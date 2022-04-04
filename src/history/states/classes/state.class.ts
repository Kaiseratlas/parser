import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import type { Province } from '../../../map';
import { x } from '../../../interface';
import type { StateHistory } from './state-history.class';
import type { StateCategory } from '../../../common';

export class State extends ProductEntity {
  constructor(product: Product, history: StateHistory) {
    super(product);
    this.history = history;
  }

  readonly history: StateHistory;

  @Expose()
  readonly id: number;
  readonly name: string;
  @Expose()
  readonly manpower = 0;
  @Expose()
  readonly impassable = false;
  @Expose({ name: 'buildings_max_level_factor' })
  readonly buildingsMaxLevelFactor: number;

  @Expose({ name: 'provinces' })
  @Transform(({ value }) => x(value))
  protected readonly provincesIds: Province['id'][] = [];

  async getProvinces(): Promise<Province[]> {
    const provinces = await this.product.map.provinces.load();
    return provinces.filter((p) => this.provincesIds.includes(p.id));
  }

  @Expose({ name: 'state_category' })
  protected readonly stateCategoryId: StateCategory['id'];

  getCategory(): Promise<StateCategory> {
    return this.product.common.stateCategories.get(this.stateCategoryId);
  }
}
