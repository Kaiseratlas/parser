import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { NameBase } from '../../names';
import type { CountryHistory } from '../../../history';
import type { CountryColor } from './country-color.class';
import { CountryFlag } from './country-flag.class';
import { CountryFlagManager } from '../managers';
import type {
  GetLocalisationOptions,
  Localisation,
} from '../../../localisation';

export class Country extends ProductEntity {
  static Flag = CountryFlag;

  constructor(
    product: Product,
    countryTag: Country['tag'],
    isDynamic: Country['isDynamic'],
  ) {
    super(product);
    this.tag = countryTag;
    this.isDynamic = isDynamic;
  }

  readonly tag: string;
  readonly isDynamic: boolean;

  get flags() {
    return new CountryFlagManager(this.product, this);
  }

  async getDefaultAdjective(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    return this.product.localisation.get({
      key: `${this.tag}_ADJ`,
      ...o,
    });
  }

  async getAdjective(
    variant: string,
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ) {
    const localisation = await this.product.localisation.get({
      key: `${this.tag}_${variant}_ADJ`,
      ...o,
    });
    if (!localisation) {
      return this.getDefaultAdjective();
    }
    return localisation;
  }

  async getCurrentAdjective(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    const history = await this.getHistory();
    return this.getAdjective(history.politics.rulingParty.ideologyId, o);
  }

  async getDefaultName(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    return this.product.localisation.get({
      key: this.tag,
      ...o,
    });
  }

  async getName(
    variant: string,
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ) {
    const localisation = await this.product.localisation.get({
      key: `${this.tag}_${variant}`,
      ...o,
    });
    if (!localisation) {
      return this.getDefaultName();
    }
    return localisation;
  }

  async getCurrentName(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    const history = await this.getHistory();
    return this.getName(history.politics.rulingParty.ideologyId, o);
  }

  getColor(): Promise<CountryColor> {
    return this.product.common.countries.colors.get(this.tag);
  }

  getNames(): Promise<NameBase> {
    return this.product.common.names.get(this.tag);
  }

  getHistory(): Promise<CountryHistory> {
    return this.product.history.countries.get(this.tag);
  }
}
