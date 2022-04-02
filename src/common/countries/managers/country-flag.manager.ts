import { GenericManager } from '@shared/';
import type { Product } from '@shared/';
import { CountryFlag } from '../classes';
import type { Country } from '../classes';
import path from 'path';

export class CountryFlagManager extends GenericManager<CountryFlag> {
  protected readonly wildcards = [
    `gfx/flags/${this.country.tag}.tga`,
    `gfx/flags/${this.country.tag}_*.tga`,
  ];

  constructor(product: Product, protected readonly country: Country) {
    super(product);
  }

  async getCurrent() {
    const history = await this.country.getHistory();
    return this.get(history.politics.rulingParty.ideologyId);
  }

  async get(variant: CountryFlag['variant']) {
    const flags = await this.load();
    const flag = flags.find((flag) => flag.variant === variant);
    if (!flag) {
      return flags.find((flag) => !flag.variant);
    }
    return flag;
  }

  protected async processFile({ path: fullPath }): Promise<CountryFlag[]> {
    const [, , countryTag, variant] = path
      .parse(fullPath)
      .name.match(/((^\w{3})_?)(.*)/);

    if (countryTag !== this.country.tag) {
      console.warn('!');
      return [];
    }
    return [
      new CountryFlag(
        this.product,
        this.country,
        variant.length ? variant : null,
      ),
    ];
  }
}
