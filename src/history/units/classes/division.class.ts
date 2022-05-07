import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';
import type { Province } from '../../../map';
import { DivisionTemplate } from './division-template.class';
import { nanoid } from 'nanoid';
import type { CountryHistory } from '../../countries';

export class Division extends ProductEntity {
  static readonly Template = DivisionTemplate;

  constructor(product: Product, readonly OOB: CountryHistory['OOB']) {
    super(product);
  }
  readonly id = nanoid();
  /**
   * Location is the province where the division spawns.
   * @protected
   */
  @Expose({ name: 'location' })
  protected readonly locationId: Province['id'];
  getLocation() {
    return this.product.map.provinces.get(this.locationId);
  }
  /**
   * The command that sets what template the division uses.
   * @protected
   */
  @Expose({ name: 'division_template' })
  protected readonly templateId: DivisionTemplate['id'];
  getTemplate(): Promise<DivisionTemplate> {
    return this.product.history.divisions.templates.get(this.templateId);
  }
  /**
   * Sets how experienced a division is when it is spawned.
   */
  @Expose({ name: 'start_experience_factor' })
  readonly startExperienceFactor: number = 0; // float
  /**
   * sets how much equipment a division has when it is spawned.
   */
  @Expose({ name: 'start_equipment_factor' })
  readonly startEquipmentFactor: number = 0; // float
}
