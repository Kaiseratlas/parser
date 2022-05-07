import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';

export class OccupationLaw extends ProductEntity {
  constructor(product: Product, id: string) {
    super(product);
    this.id = id;
  }
  /**
   * ID is used for localization
   */
  readonly id: string;

  /**
   * Tooltip description for the law
   */
  @Expose()
  protected readonly tooltip: string = null;

  getTooltip() {
    if (!this.tooltip) {
      return null;
    }
    return this.product.i18n.t({ key: this.tooltip });
  }

  /**
   * GFX entry & frame for law entry icon
   * GFX entry can be omitted, in that case it will default to GFX_occupation_policy_icon_strip
   */
  @Expose()
  protected readonly icon: number = null;

  /**
   * If a current modifier is no longer active (visible/available is false) it will fallback to this law
   */
  @Expose({ name: 'fallback_law' })
  protected readonly fallbackLawId: OccupationLaw['id'] = null;

  // getFallbackLaw() {
  //   return
  // }

  /**
   * Main fallback modifier will be used when previous modifier is no longer active and there is no fallback_law, there must be exactly one fallback modifier
   * If you are lacking manpower/equipments for your current laws, fallback modifier bonuses will apply instead (will lerp to fallback and at 0 manpower you will be forced to switch)
   */
  @Expose({ name: 'main_fallback_law' })
  protected readonly isMainFallbackLaw: boolean = false;
  /**
   * By default, laws are sorted by load order, gui_order can be used to reorder them in gui. by default, it is 0
   */
  @Expose({ name: 'gui_order' })
  readonly guiOrder: number = 0;
  @Expose({ name: 'default_law' })
  readonly isDefaultLaw: boolean = false;
}
