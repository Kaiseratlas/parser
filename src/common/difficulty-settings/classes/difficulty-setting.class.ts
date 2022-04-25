import { Expose } from 'class-transformer';
import { ProductEntity } from '@shared/';

export class DifficultySetting extends ProductEntity {
  @Expose()
  readonly key: string;

  getName() {
    return this.product.i18n.t({ key: this.key });
  }

  @Expose()
  readonly modifier: string;
  @Expose({ name: 'countries' })
  protected readonly countryTags: string[] = [];

  async getCountries() {
    const countries = await this.product.common.countries.load();
    return countries.filter((country) =>
      this.countryTags.includes(country.tag),
    );
  }

  @Expose()
  readonly multiplier: number = 1.0;
}
