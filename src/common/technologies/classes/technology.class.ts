import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';

export class Technology extends ProductEntity {
  constructor(product: Product, id: Technology['id']) {
    super(product);
    this.id = id;
  }
  readonly id: string;

  @Expose({ name: 'doctrine' })
  readonly isDoctrine = false;
  @Expose({ name: 'research_cost' })
  readonly researchCost = 1;
  @Expose({ name: 'start_year' })
  readonly startYear: number;
  @Expose({ name: 'show_effect_as_desc ' })
  readonly showEffectAsDesc = false;
  @Expose({ name: 'sub_technologies' })
  readonly subTechnologies: string[] = [];
}
