import { ProductEntity } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import type { Ideology } from '../../ideologies';

export class CountryLeader extends ProductEntity {
  static readonly Key = 'country_leader';

  @Expose()
  protected readonly ideology: Ideology['id'];

  getIdeology(): Promise<Ideology> {
    return this.product.common.ideologies.get(
      this.ideology.replace(/_subtype$/, ''),
    );
  }

  @Expose({ name: 'desc' })
  @Transform(({ value }) => value ?? null)
  readonly description: string | null;
}
