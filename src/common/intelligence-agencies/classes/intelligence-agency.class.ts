import { Expose } from 'class-transformer';
import { ProductEntity } from '@shared/';

export class IntelligenceAgency extends ProductEntity {
  @Expose()
  readonly names: string[];
}
