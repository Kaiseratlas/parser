import { ProductEntity, convertToArray } from '@shared/';
import type { Product } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import type { Province } from '../../../map';
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
  readonly manpower: number = 0;
  @Expose()
  readonly impassable: boolean = false;
  @Expose({ name: 'buildings_max_level_factor' })
  readonly buildingsMaxLevelFactor: number;

  @Expose({ name: 'provinces' })
  @Transform(({ value }) => convertToArray(value))
  protected readonly provincesIds: Province['id'][] = [];

  async getProvinces(): Promise<Province[]> {
    const provinces = await this.product.map.provinces.load();
    return provinces.filter((p) => this.provincesIds.includes(p.id));
  }

  getName() {
    return this.product.i18n.t({ key: `STATE_${this.id}` });
  }

  hasProvince(province: Province | Province['id']): boolean {
    if (typeof province === 'object') {
      return this.provincesIds.includes(province.id);
    }
    return this.provincesIds.includes(province);
  }

  @Expose({ name: 'state_category' })
  protected readonly stateCategoryId: StateCategory['id'];

  getCategory(): Promise<StateCategory> {
    return this.product.common.stateCategories.get(this.stateCategoryId);
  }
}
