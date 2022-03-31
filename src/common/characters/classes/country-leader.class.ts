import { ProductEntity } from '@shared/';
import { Expose, Transform } from 'class-transformer';

export class CountryLeader extends ProductEntity {
  @Expose()
  readonly ideology: string;

  @Expose({ name: 'desc' })
  @Transform(({ value }) => value ?? null)
  readonly description: string | null;
}
