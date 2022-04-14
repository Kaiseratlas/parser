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
  protected readonly description: string | null;

  getDescription() {
    if (!this.description) {
      return null;
    }
    return this.product.i18n.t({ key: this.description });
  }
}
