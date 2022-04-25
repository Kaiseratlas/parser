import { ProductEntity, TransformToArray } from '@shared/';
import type { Product } from '@shared/';
import { UnitCategory } from './unit-category.class';
import { Expose } from 'class-transformer';
import { Equipment } from './equipment.class';
import { UnitGroup } from './unit-group.class';

export class Unit extends ProductEntity {
  static readonly Group = UnitGroup;
  static readonly Equipment = Equipment;
  static readonly Category = UnitCategory;

  constructor(product: Product, group: UnitGroup, readonly id: string) {
    super(product);
    this.group = group;
  }

  getName() {
    return this.product.i18n.t({ key: this.id });
  }

  getDescription() {
    return this.product.i18n.t({ key: `${this.id}_desc` });
  }

  readonly abbreviation: string;
  // sprite =
  //readonly map_icon_category = infantry

  /**
   * Controls which icon is used if multiple subunits of the same type exist
   */
  @Expose()
  readonly priority: number;
  @Expose({ name: 'ai_priority' })
  readonly aiPriority: number;
  @Expose()
  readonly active: boolean;
  //
  // type = {
  //   infantry
  // }

  readonly group: UnitGroup = null;

  /**
   * Sets the speed of subunit via equipment. Used for motorized/mechanized
   * @protected
   */
  protected readonly transportEquipmentId: Equipment['id'] = null;

  getTransport(): Promise<Equipment> {
    if (!this.transportEquipmentId) {
      return null;
    }
    return this.product.common.units.equipments.get(this.transportEquipmentId);
  }

  /**
   * Equipment that is required for this unit. Used when active = no
   * @protected
   */
  @Expose({ name: 'essential' })
  @TransformToArray()
  protected readonly essentialEquipmentIds: Array<Equipment['id']> = [];

  async getEssentials(): Promise<Equipment[]> {
    const equipments = await this.product.common.units.equipments.load();
    return equipments.filter((equipment) =>
      this.essentialEquipmentIds.includes(equipment.id),
    );
  }
  /**
   * Equipment needed to produce this unit. Unit won't be available until the nation has this equipment
   * @protected
   */
  @Expose({ name: 'need' })
  @TransformToArray()
  protected readonly needEquipmentIds: Array<Equipment['id']> = [];

  async getNeeds(): Promise<Equipment[]> {
    const equipments = await this.product.common.units.equipments.load();
    return equipments.filter((equipment) =>
      this.needEquipmentIds.includes(equipment.id),
    );
  }

  @Expose({ name: 'categories' })
  @TransformToArray()
  protected readonly categoryIds: Array<UnitCategory['id']> = [];

  async getCategories() {
    const unitCategories = await this.product.common.units.categories.load();
    return unitCategories.filter((unitCategory) =>
      this.categoryIds.includes(unitCategory.id),
    );
  }

  @Expose({ name: 'combat_width' })
  readonly combatWidth: number = 0;

  // Size Definitions
  @Expose({ name: 'max_strength' })
  readonly maxStrength: number; // float
  @Expose({ name: 'max_organisation' })
  readonly maxOrganisation: number;
  @Expose({ name: 'default_morale' })
  readonly defaultMorale: number; // float
  @Expose()
  readonly manpower: number = 0;

  // Misc Abilities
  @Expose({ name: 'training_time' })
  readonly trainingTime: number;
  @Expose()
  readonly suppression: number; // float
  @Expose()
  readonly weight: number; // float

  @Expose({ name: 'supply_consumption' })
  readonly supplyConsumption: number; // float
}
