import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import path from 'path';

export class CountryFlag extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }

  get standard() {
    return this.product.interface.sprites.make(
      path.join('gfx', 'flags', `${this.id}.tga`),
    );
  }

  get medium() {
    return this.product.interface.sprites.make(
      path.join('gfx', 'flags', 'medium', `${this.id}.tga`),
    );
  }

  get small() {
    return this.product.interface.sprites.make(
      path.join('gfx', 'flags', 'small', `${this.id}.tga`),
    );
  }
}
