import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';

export class WarGoal extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }
  @Expose({ name: 'generate_base_cost' })
  readonly generateBaseCost: number = 0;
  @Expose({ name: 'generate_per_state_cost' })
  readonly generatePerStateCost: number = 0;
  @Expose({ name: 'take_states_limit' })
  readonly takeStatesLimit: number = 0;
  @Expose({ name: 'take_states_cost' })
  readonly takeStatesCost: number = 0;
  @Expose()
  readonly expire: number = 0;
  @Expose()
  readonly threat: number = 0;

  getName() {
    return this.product.i18n.t({ key: this.id });
  }

  getDescription() {
    return this.product.i18n.t({ key: `${this.id}_desc` });
  }

  getShortDescription() {
    return this.product.i18n.t({ key: `${this.id}_short_desc` });
  }
}
