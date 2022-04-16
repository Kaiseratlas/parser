import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { Country } from './country.class';
import path from 'path';
import type { Localisation } from '../../../localisation';

export class CountryFlag extends ProductEntity {
  constructor(
    product: Product,
    protected readonly country: Country,
    readonly variant: string | null = null,
  ) {
    super(product);
  }

  getName(): Promise<Localisation> {
    return this.product.i18n.t({
      key: `${this.country.tag}${this.variant ? `_${this.variant}` : ''}`,
    });
  }

  get filename() {
    return `${this.country.tag}${this.variant ? `_${this.variant}` : ''}.tga`;
  }

  get standard() {
    return this.product.interface.sprites.make(
      path.join('gfx', 'flags', this.filename),
    );
  }

  get medium() {
    return this.product.interface.sprites.make(
      path.join('gfx', 'flags', 'medium', this.filename),
    );
  }

  get small() {
    return this.product.interface.sprites.make(
      path.join('gfx', 'flags', 'small', this.filename),
    );
  }
}
