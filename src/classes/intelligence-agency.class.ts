import { Expose } from 'class-transformer';

export class IntelligenceAgency {
  @Expose()
  readonly names: string[];
}
