import { ProductEntity } from '@shared/';
import type { Province } from './province.class';
import { Expose } from 'class-transformer';
import type { Localisation } from '../../localisation';

/**
 * Each strategic region is typically stored in it's own file, although you can store multiple strategic region definitions within the same file, as the ID is defined within the strategic region definition, rather than the file title.
 */
export class StrategicRegion extends ProductEntity {
  static readonly Key = 'strategic_region';
  /**
   * Defines the numerical id used by the strategic region.
   * The strategic region IDs must be added sequentially, skipping numbers will cause crashes.
   */
  @Expose()
  readonly id: number;
  /**
   * Defines the localization key the strategic region uses.
   * You can use a non-localized string (i.e. "Paris"), but it is best practice to use localized strings.
   * @protected
   */
  @Expose()
  protected readonly name: Localisation['key'] | string;
  /**
   * Scope defines which provinces the strategic region is composed over.
   * @protected
   */
  @Expose({ name: 'provinces' })
  protected readonly provinceIds: Province['id'][] = [];

  getName() {
    return this.product.i18n.t({ key: this.name });
  }

  async getProvinces(): Promise<Province[]> {
    const provinces = await this.product.map.provinces.load();
    return provinces.filter((province) =>
      this.provinceIds.includes(province.id),
    );
  }
}
