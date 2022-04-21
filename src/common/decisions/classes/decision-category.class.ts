import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';
import type { Sprite } from '../../../interface';
import { Localisation } from '../../../localisation';

export class DecisionCategory extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }

  getName(): Promise<Localisation | null> {
    return this.product.i18n.t({ key: this.id });
  }

  @Expose()
  protected readonly priority: number = 0;
  @Expose()
  protected readonly icon: string = null;

  getIcon(): Promise<Sprite> {
    if (!this.icon) {
      return null;
    }
    return this.product.interface.sprites.get(this.icon);
  }

  @Expose()
  protected readonly picture: string = null;

  getPicture(): Promise<Sprite> {
    if (!this.icon) {
      return null;
    }
    return this.product.interface.sprites.get(this.picture);
  }
}
