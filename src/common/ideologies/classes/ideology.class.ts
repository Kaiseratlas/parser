import { Expose } from 'class-transformer';
import { ProductEntity } from '@shared/';

export class Ideology extends ProductEntity {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly grouping: string;
  @Expose()
  readonly description: string;
}
