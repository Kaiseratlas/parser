import { Expose } from 'class-transformer';
import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

export class Ability extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }

  static readonly Key = 'ability';

  @Expose()
  protected readonly name: string;

  getName() {
    return this.product.localisation.get(`ABILITY_${this.name}`);
  }

  @Expose({ name: 'desc' })
  protected readonly description: string;

  getDescription() {
    return this.product.localisation.get(`ABILITY_${this.description}_DESC`);
  }
}
