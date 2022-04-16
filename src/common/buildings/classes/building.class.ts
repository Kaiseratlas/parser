import { ProductEntity, TransformToOne } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';

const MODIFIER_PRODUCTION_SPEED = 'modifier_production_speed';

/**
 * A building is a structure built using Civilian factories in states or provinces.
 */
export class Building extends ProductEntity {
  constructor(product: Product, readonly id: string) {
    super(product);
  }

  /**
   * Cost in CIC to build.
   */
  @Expose({ name: 'base_cost' })
  @TransformToOne()
  readonly baseCost: number;
  /**
   * Cost in CIC to convert to.
   */
  @Expose({ name: 'base_cost_conversion' })
  @TransformToOne()
  readonly baseCostConversion: number;
  /**
   * Added cost per building level.
   */
  @Expose({ name: 'per_level_extra_cost' })
  @TransformToOne()
  readonly perLevelExtraCost: number;
  /**
   * The maximum level that can be built.
   */
  @Expose({ name: 'max_level' })
  @TransformToOne()
  readonly maxLevel: number;
  /**
   * The base health of the building. Is multiplied by the level of the building built.
   */
  @Expose()
  @TransformToOne()
  readonly value: number = 0;
  /**
   * Which icon frame in GFX_buildings_strip to use for the building.
   */
  @Expose({ name: 'icon_frame' })
  @TransformToOne()
  readonly iconFrame: number;
  /**
   * The amount of <building> models to display on the map when one instance is built.
   */
  @Expose({ name: 'show_on_map' })
  @TransformToOne()
  readonly showOnMap: number;
  /**
   * Number of models to display.
   */
  @Expose({ name: 'show_on_map_meshes' })
  @TransformToOne()
  readonly showOnMapMeshes: number;
  /**
   * Whether to always show the <building> model.
   */
  @Expose({ name: 'always_shown' })
  @TransformToOne()
  readonly isAlwaysShown: boolean = false;
  /**
   * Whether to show destroyed mesh for building.
   */
  @Expose({ name: 'has_destroyed_mesh' })
  @TransformToOne()
  readonly hasDestroyedMesh: boolean = false;
  /**
   * Determines if this building uses building slots.
   */
  @Expose({ name: 'shares_slots' })
  @TransformToOne()
  readonly hasSharesSlots: boolean = false;
  /**
   * Determines if this building benefits from infrastructure boosting construction speed.
   */
  @Expose({ name: 'infrastructure_construction_effect' })
  @TransformToOne()
  readonly hasInfrastructureConstructionEffect: boolean = false;
  /**
   * Determines if this building is a province building.
   */
  @Expose({ name: 'provincial' })
  @TransformToOne()
  readonly isProvincial: boolean = false;
  /**
   * Modifies damage taken from bombing.
   */
  @Expose({ name: 'damage_factor' })
  @TransformToOne()
  readonly damageFactor: number = 0;
  /**
   * Limits this building to only coastal provinces/states.
   */
  @Expose({ name: 'only_costal' })
  @TransformToOne()
  readonly isOnlyCoastal: boolean = false;
  /**
   * Limits this building, disabling in a DMZ state.
   */
  @Expose({ name: 'disabled_in_dmz' })
  @TransformToOne()
  readonly isDisabledInDMZ: boolean = false;
  /**
   * Determines if this building is considered infrastructure.
   */
  @Expose({ name: 'infrastructure' })
  @TransformToOne()
  readonly isInfrastructure: boolean = false;
  /**
   * Determines if this building is considered an air base.
   */
  @Expose({ name: 'air_base' })
  @TransformToOne()
  readonly isAirBase: boolean = false;
  /**
   * Determines if this building is considered a port.
   */
  @Expose({ name: 'is_port' })
  @TransformToOne()
  readonly isPort: boolean = false;
  /**
   * Determines if this building is considered an anti-air installation.
   */
  @Expose({ name: 'anti_air' })
  @TransformToOne()
  readonly isAntiAir: boolean = false;
  /**
   * Determines if this building is considered a refinery.
   */
  @Expose({ name: 'refinery' })
  @TransformToOne()
  readonly isRefinery: boolean = false;
  /**
   * Determines if this building is considered a radar station.
   */
  @Expose({ name: 'radar' })
  @TransformToOne()
  readonly isRadar: boolean = false;
  /**
   * Determines if this building is considered a nuclear reactor.
   */
  @Expose({ name: 'nuclear_reactor' })
  @TransformToOne()
  readonly isNuclearReactor: boolean = false;
  /**
   * Adds X amount of MIC production. <This functions like a boolean, you will get 1 MIC, setting a higher number will not add any more MIC
   */
  @Expose({ name: 'military_production' })
  @TransformToOne()
  readonly militaryProduction: number = 0;
  /**
   * Adds X amount of CIC production. <This functions like a boolean, you will get 1 CIC, setting a higher number will not add any more CIC
   */
  @Expose({ name: 'general_production' })
  @TransformToOne()
  readonly generalProduction: number = 0;
  /**
   * Adds X amount of NIC production. <This functions like a boolean, you will get 1 NIC, setting a higher number will not add any more NIC
   */
  @Expose({ name: 'naval_production' })
  @TransformToOne()
  readonly navalProduction: number = 0;
  /**
   * Adds X amount of land fort.
   */
  @Expose({ name: 'land_fort' })
  @TransformToOne()
  readonly landFort: number = 0;
  /**
   * Adds X amount of naval fort.
   */
  @Expose({ name: 'naval_fort' })
  @TransformToOne()
  readonly navalFort: number = 0;
  /**
   * Adds X amount of rocket production.
   */
  @Expose({ name: 'rocket_production' })
  @TransformToOne()
  readonly rocketProduction: number = 0;
  /**
   * Adds X amount of rocket capacity.
   */
  @Expose({ name: 'rocket_launch_capacity' })
  @TransformToOne()
  readonly rocketLaunchCapacity: number = 0;

  getName() {
    return this.product.i18n.t({ key: this.id });
  }

  getDescription() {
    return this.product.i18n.t({ key: `${this.id}_desc` });
  }

  getPlural() {
    return this.product.i18n.t({ key: `${this.id}_plural` });
  }

  protected modifierProductionSpeedKey(suffix = ''): string {
    return `${MODIFIER_PRODUCTION_SPEED}_${this.id}${
      suffix ? `_${suffix}` : ''
    }`;
  }

  getModifierProductionSpeed() {
    return this.product.i18n.t({
      key: this.modifierProductionSpeedKey(),
    });
  }
  getModifierProductionSpeedDescription() {
    return this.product.i18n.t({
      key: this.modifierProductionSpeedKey('desc'),
    });
  }
  getModifierProductionSpeedFactor() {
    return this.product.i18n.t({
      key: this.modifierProductionSpeedKey('factor'),
    });
  }
  getModifierProductionSpeedFactorDescription() {
    return this.product.i18n.t({
      key: this.modifierProductionSpeedKey('factor_desc'),
    });
  }
}
