import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';
import { BookmarkCountry } from './bookmark-country.class';

export class Bookmark extends ProductEntity {
  static readonly Country = BookmarkCountry;

  @Expose()
  protected readonly name: string;

  getName() {
    return this.product.i18n.t({ key: this.name });
  }

  @Expose({ name: 'desc' })
  protected readonly description: string;

  getDescription() {
    return this.product.i18n.t({ key: this.description });
  }
  @Expose()
  readonly date: Date;
  @Expose()
  protected readonly picture: string;
  @Expose({ name: 'default_country' })
  readonly defaultCountryTag: string;
  @Expose({ name: 'default' })
  readonly isDefault: boolean = false;

  readonly countries: BookmarkCountry[] = [];

  addCountry(...countries: BookmarkCountry[]) {
    this.countries.push(...countries);
  }
}
