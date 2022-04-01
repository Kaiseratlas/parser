import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';
import type { Sprite } from '../../../interface';
import { x } from '../../../interface';

export class IntelligenceAgency extends ProductEntity {
  @Expose()
  readonly names: string[];
  @Expose()
  protected readonly picture: string;
  // @Expose()
  // @Transform(({ value }) => x(value))
  // protected readonly default: string;
  // @Expose()
  // @Transform(({ value }) => x(value))
  // protected readonly available: string;

  getEmblem(): Promise<Sprite> {
    return this.product.interface.sprites.get(this.picture);
  }
}
