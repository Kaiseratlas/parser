import { Expose } from 'class-transformer';
import { ProductEntity } from '@shared/';
import { Sprite } from '../../../interface';

export class AutonomyState extends ProductEntity {
  /**
   * ID of the autonomy state, unique to each one. It is necessary to define to distinguish it from other autonomy states.
   */
  @Expose()
  readonly id: string;
  /**
   * If true, the game will attempt to make the 'puppet' option in peace deals as well as the 'puppet' effect use this autonomy state among other default autonomy states
   */
  @Expose()
  readonly isDefault = false;
  /**
   * Decides whether the subject is a puppet or not, making is_puppet and is_puppet_of triggers true in that case.
   */
  @Expose({ name: 'is_puppet' })
  readonly isPuppet: boolean;
  /**
   * Makes the subject have the same country color as the overlord.
   */
  @Expose({ name: 'use_overlord_color' })
  readonly useOverlordColor = false; // TODO: what is default value?
  /**
   * Decides the order in which autonomy states are placed. The autonomy states with lower freedom levels have less autonomy than those with higher when the game places the autonomy states for the subject to lose or gain a level.
   * This also decides how much autonomy points the subject needs to gain or lose a level.
   */
  @Expose({ name: 'min_freedom_level' })
  readonly minFreedomLevel: number;
  /**
   * Initial freedom level of the country that gets set to this autonomy after a peace conference on a scale from 0 to 1.
   */
  @Expose({ name: 'peace_conference_initial_freedom' })
  readonly peaceConferenceInitialFreedom = 0.5;
  /**
   * Decides how large of a portion of the subject's manpower the overlord can use in colonial divisions.
   */
  @Expose({ name: 'manpower_influence' })
  readonly manpowerInfluence: number;

  getName() {
    return this.product.i18n.t({ key: this.id });
  }

  async getIcon(): Promise<Sprite> {
    const icon = await this.product.interface.sprites.get(
      `GFX_${this.id}_icon`,
    );
    if (icon) {
      return icon;
    }
    return this.product.interface.sprites.get('GFX_autonomy_unknown_icon');
  }
}
