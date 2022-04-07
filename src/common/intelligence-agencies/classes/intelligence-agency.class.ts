import { Expose, Transform } from 'class-transformer';
import { ProductEntity } from '@shared/';
import type { Sprite } from '../../../interface';

export class IntelligenceAgency extends ProductEntity {
  static readonly Key = 'intelligence_agency';

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
    console.log('this.picture', this.picture)
    return this.product.interface.sprites.get(this.picture);
  }
}
