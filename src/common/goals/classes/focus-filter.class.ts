import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { Localisation } from '../../../localisation';
import type { Sprite } from '../../../interface';

export class FocusFilter extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }

  getName(): Promise<Localisation> {
    return this.product.i18n.t({ key: this.id });
  }

  getIcon(): Promise<Sprite> {
    return this.product.interface.sprites.get(`GFX_${this.id}`);
  }
}
