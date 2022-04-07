import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { Province } from './province.class';
import type { State } from '../../history';

export class Continent extends ProductEntity {
  constructor(product: Product, id: Continent['id'], name: Continent['name']) {
    super(product);
    this.id = id;
    this.name = name;
  }
  readonly id: number;
  readonly name: string;

  getName() {
    return this.product.localisation.translate({ key: this.name });
  }

  getAdjective() {
    return this.product.localisation.translate({ key: `${this.name}_adj` });
  }

  async getProvinces(): Promise<Province[]> {
    const provinces = await this.product.map.provinces.load();
    return provinces.filter((province) => province.belongsToContinent(this));
  }

  async getStates(): Promise<State[]> {
    const [states, provinces] = await Promise.all([
      this.product.history.states.load(),
      this.getProvinces(),
    ]);

    return states.filter((state) =>
      provinces.some((province) => !!state.hasProvince(province)),
    );
  }

  async getCountries() {
    const [countries, states] = await Promise.all([
      this.product.common.countries.load(),
      this.getStates(),
    ]);
    return countries.filter((country) =>
      states.some(
        (state) =>
          state.history.isControlledBy(country) ||
          state.history.hasClaimFrom(country),
      ),
    );
  }
}
