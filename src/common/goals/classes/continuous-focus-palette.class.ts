import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';

/**
 * Focuses which grant constant effect while selected and can't be completed.
 */
export class ContinuousFocusPalette extends ProductEntity {
  /**
   * Decides the unique ID of the palette.
   */
  @Expose()
  readonly id: string;
  /**
   * Marks the focus palette as default. It is unknown if this has uses in continuous focus palettes, but avoid having less than or more than 1 default palette.
   */
  @Expose({ name: 'default' })
  readonly isDefault: boolean;
  /**
   * Will make the value check be refreshed when the country enters a civil war.
   */
  @Expose({ name: 'reset_on_civilwar' })
  readonly resetOnCivilWar: boolean;
}
