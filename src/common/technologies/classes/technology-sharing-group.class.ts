import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';
import type { Sprite } from '../../../interface';

export class TechnologySharingGroup extends ProductEntity {
  @Expose()
  readonly id: string;
  @Expose({ name: 'name' })
  protected readonly name: string;
  @Expose({ name: 'desc' })
  protected readonly desc: string;
  @Expose()
  protected readonly picture: string;
  @Expose({ name: 'research_sharing_per_country_bonus' })
  readonly researchSharingPerCountryBonus: number;

  getEmblem(): Promise<Sprite> {
    return this.product.interface.sprites.get(this.picture);
  }
}
