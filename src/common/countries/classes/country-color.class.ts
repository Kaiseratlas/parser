import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { Country } from './country.class';
import Color from 'color';
import { Expose, Transform } from 'class-transformer';

export class CountryColor extends ProductEntity {
  constructor(product: Product, countryTag: CountryColor['tag']) {
    super(product);
    this.tag = countryTag;
  }

  readonly tag: Country['tag'];
  @Expose({ name: 'color' })
  @Transform(({ value }) => Color.rgb(...value['rgb']))
  readonly main: Color;
  @Expose({ name: 'color_ui' })
  @Transform(({ value }) => Color.rgb(...value['rgb']))
  readonly ui: Color;
}
