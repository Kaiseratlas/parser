import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';

export class ContinuousFocusPalette extends ProductEntity {
  @Expose()
  readonly id: string;
  @Expose({ name: 'default' })
  readonly isDefault: boolean;
  @Expose({ name: 'reset_on_civilwar' })
  readonly resetOnCivilWar: boolean;
}
