import { Expose } from 'class-transformer';

export class Ideology {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly grouping: string;
  @Expose()
  readonly description: string;
}
