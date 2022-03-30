import { Expose } from 'class-transformer';

export class Focus {
  @Expose()
  readonly id: string;
  @Expose()
  readonly x: number;
  @Expose()
  readonly y: number;
  @Expose()
  readonly cost: number;
}
