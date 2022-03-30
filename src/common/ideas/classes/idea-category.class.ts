import { Expose } from 'class-transformer';

export class IdeaCategory {
  @Expose()
  readonly id: string;
}
