import { Expose } from 'class-transformer';
import { EventType } from '../enums';
import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { GetLocalisationOptions, Localisation } from '../../localisation';
import type { Sprite } from '../../interface';

export class Event extends ProductEntity {
  static Type = EventType;

  constructor(product: Product, readonly type: EventType) {
    super(product);
  }

  @Expose()
  readonly id: string;
  @Expose()
  protected readonly title: string;
  @Expose({ name: 'desc' })
  protected readonly description: string;

  /**
   * Get an event title
   * @param o
   */
  getTitle(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    return this.product.localisation.translate({ key: this.title, ...o });
  }

  /**
   * Get an event description
   * @param o
   */
  getDescription(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    return this.product.localisation.translate({ key: this.description, ...o });
  }

  @Expose()
  protected readonly picture: string | null = null;

  getPicture(): Promise<Sprite | null> {
    if (!this.picture) {
      return null;
    }
    return this.product.interface.sprites.get(this.picture);
  }

  @Expose({ name: 'fire_only_once' })
  readonly fireOnlyOnce = false;
  @Expose({ name: 'is_triggered_only' })
  readonly isTriggeredOnly = false;
  @Expose({ name: 'timeout_days' })
  readonly timeoutDays = 13;
  @Expose({ name: 'fire_for_sender' })
  readonly fireForSender = true;
}
