import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { DecisionCategory } from './decision-category.class';
import { Expose } from 'class-transformer';
import type { Sprite } from '../../../interface';
import type { Localisation } from '../../../localisation';

export class Decision extends ProductEntity {
  static readonly Category = DecisionCategory;

  constructor(
    product: Product,
    readonly categoryId: string,
    readonly id: string,
  ) {
    super(product);
  }

  getCategory(): Promise<DecisionCategory> {
    return this.product.common.decisions.categories.get(this.categoryId);
  }

  @Expose()
  protected readonly icon: string = null;
  getIcon(): Promise<Sprite> {
    if (!this.icon) {
      return null;
    }
    return this.product.interface.sprites.get(this.icon);
  }
  @Expose()
  readonly cost: number = 0;
  @Expose({ name: 'fire_only_once' })
  readonly fireOnlyOnce: boolean = false;

  getName(): Promise<Localisation | null> {
    return this.product.i18n.t({ key: this.id });
  }

  getDescription(): Promise<Localisation | null> {
    return this.product.i18n.t({ key: `${this.id}_desc` });
  }
}
