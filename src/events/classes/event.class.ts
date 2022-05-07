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
  /**
   * A unique identifier for the event.
   */
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
  /**
   * The picture to use in the event popup.
   * @protected
   */
  @Expose()
  protected readonly picture: string = null;

  getPicture(): Promise<Sprite | null> {
    if (!this.picture) {
      return null;
    }
    return this.product.interface.sprites.get(this.picture);
  }
  /**
   * If false, the event can fire multiple times.
   */
  @Expose({ name: 'fire_only_once' })
  readonly fireOnlyOnce: boolean = false;
  /**
   *  If true, the event cannot randomly happen through mean_time_to_happen,
   *  it must be triggered explicitly in an effect. Also, if set to no, the event can not happen through a trigger
   */
  @Expose({ name: 'is_triggered_only' })
  readonly isTriggeredOnly: boolean = false;
  @Expose({ name: 'timeout_days' })
  /**
   * Number of days for the recipient to respond. After the timeout, the first option gets selected.
   */
  readonly timeoutDays = 13;
  @Expose({ name: 'fire_for_sender' })
  /**
   * If false, the event will not be shown to the sending country, even if it is a major event.
   */
  readonly fireForSender: boolean = true;
  /**
   * The event will not be shown but can still cause other side effects, like triggering different events.
   */
  @Expose({ name: 'hidden' })
  readonly isHidden: boolean = false;
  /**
   * TODO: !
   */
  @Expose({ name: 'exclusive' })
  readonly isExclusive: boolean = false;
  /**
   * If true, the event will be shown to all countries.
   */
  @Expose({ name: 'major' })
  readonly isMajor: boolean = false;
  /**
   * Limits which countries a major event is shown to.
   */
  @Expose({ name: 'show_major' })
  readonly showMajor: any; // TODO: !
}
