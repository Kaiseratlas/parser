import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';
import type { Sprite } from '../../../interface';
import Color from 'color';

export class Ideology extends ProductEntity {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly grouping: string;
  @Expose()
  readonly description: string;
  @Expose({ name: 'can_be_boosted' })
  readonly canBeBoosted = true;
  @Expose({ name: 'can_collaborate' })
  readonly canCollaborate = false;

  @Expose()
  @Transform(({ value }) => Color.rgb(...value))
  readonly color: Color | null = null;

  // https://hoi4.paradoxwikis.com/Ideology_modding#GFX
  getIcon(): Promise<Sprite> {
    return this.product.interface.sprites.get(`GFX_ideology_${this.id}_group`);
  }
}
