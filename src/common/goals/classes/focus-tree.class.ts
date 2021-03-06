import { Expose } from 'class-transformer';
import type { Focus } from './focus.class';
import { ProductEntity } from '@shared/';
import type { FocusTreeCountry } from './focus-tree-country.class';
import type { Country } from '../../countries';

type FocusMap = Map<Focus['id'], Focus>;

export class FocusTree extends ProductEntity {
  static readonly Key = 'focus_tree';

  @Expose()
  readonly id: string;

  getName() {
    return this.product.i18n.t({ key: this.id });
  }

  protected readonly focusMap: FocusMap = new Map();

  get focuses() {
    return [...this.focusMap.values()];
  }

  getFocus(id: Focus['id']): Focus | null {
    return this.focusMap.get(id) ?? null;
  }

  readonly countries: FocusTreeCountry[] = [];

  addCountry(...countries: FocusTreeCountry[]): FocusTree {
    this.countries.push(...countries);
    return this;
  }

  protected get countryTags() {
    return this.countries
      .map((country) => country.modifiers.map((modifier) => modifier['tag']))
      .flat();
  }

  async getCountries(): Promise<Country[]> {
    const countries = await this.product.common.countries.load();
    return countries.filter((country) =>
      this.countryTags.includes(country.tag),
    );
  }

  addFocus(...focuses: Focus[]) {
    focuses.forEach((focus) => this.focusMap.set(focus.id, focus));
  }
}
