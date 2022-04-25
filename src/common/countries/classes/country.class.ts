import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { NameBase } from '../../names';
import type { CountryHistory } from '../../../history';
import type { CountryColor } from './country-color.class';
import { CountryFlag } from './country-flag.class';
import type {
  GetLocalisationOptions,
  Localisation,
} from '../../../localisation';
import type { State } from '../../../history';
import { FocusTree } from '../../goals';

interface GetStatesOptions {
  onlyCore: boolean;
  withClaims: boolean;
}

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

  async getCurrentTag() {
    const history = await this.getHistory();
    return history.currentTag;
  }

  async getFocusTrees(): Promise<FocusTree[]> {
    const trees = await this.product.common.goals.load();
    return trees.filter((tree) =>
      tree.countries.some((country) =>
        country.modifiers.some((modifier) => modifier['tag'] === this.tag),
      ),
    );
  }

  async getDefaultAdjective(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    const tag = await this.getCurrentTag();
    return this.product.localisation.translate({
      key: `${tag}_ADJ`,
      ...o,
    });
  }

  async getAdjective(
    variant: string,
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ) {
    const tag = await this.getCurrentTag();
    const localisation = await this.product.localisation.translate({
      key: `${tag}_${variant}_ADJ`,
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
    const tag = await this.getCurrentTag();
    return this.product.localisation.translate({
      key: tag,
      ...o,
    });
  }

  async getName(
    variant: string,
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ) {
    const tag = await this.getCurrentTag();
    const localisation = await this.product.localisation.translate({
      key: `${tag}_${variant}`,
      ...o,
    });
    if (!localisation) {
      return this.getDefaultName();
    }
    return localisation;
  }

  async getFlag(variant?: string) {
    const tag = await this.getCurrentTag();
    const flagId = `${tag}${variant ? `_${variant}` : ''}`;
    return this.product.common.countries.flags.get(flagId);
  }

  async getFlags(): Promise<CountryFlag[]> {
    const [flags, ideologies, history] = await Promise.all([
      this.product.common.countries.flags.load(),
      this.product.common.ideologies.load(),
      this.getHistory(),
    ]);
    const flagIds = ideologies
      .map((ideology) => `${this.tag}_${ideology.id}`)
      .concat(this.tag);
    const cosmeticTag = await history.getCosmeticTag();
    if (cosmeticTag) {
      const cosmeticFlagIds = ideologies.map(
        (ideology) => `${cosmeticTag.tag}_${ideology.id}`,
      );
      flagIds.push(cosmeticTag.tag, ...cosmeticFlagIds);
    }
    return flags.filter((flag) => flagIds.includes(flag.id));
  }

  async getCurrentFlag() {
    const history = await this.getHistory();
    const cosmeticTag = await history.getCosmeticTag();
    const flagId = `${cosmeticTag.tag ?? this.tag}_${
      history.politics.rulingParty.ideologyId
    }`;
    const flag = await this.product.common.countries.flags.get(flagId);
    if (flag) {
      return flag;
    }
    return this.product.common.countries.flags.get(
      `${cosmeticTag.tag ?? this.tag}`,
    );
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

  async getManpower(): Promise<number> {
    const states = await this.getStates();
    return states.reduce(
      (previousValue, currentValue) => previousValue + currentValue.manpower,
      0,
    );
  }

  async getStates(o?: GetStatesOptions): Promise<State[]> {
    const states = await this.product.history.states.load();
    return states.filter((state) => {
      const conditions = [];
      if (o?.onlyCore) {
        conditions.push(state.history.isCoreOf(this));
      }
      conditions.push(state.history.isControlledBy(this));

      const isControlled = conditions.every((condition) => !!condition);

      return (
        isControlled ||
        (o?.withClaims ? state.history.hasClaimFrom(this) : false)
      );
    });
  }
}
