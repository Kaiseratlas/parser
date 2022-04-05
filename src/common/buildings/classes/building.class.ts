import { ProductEntity } from '@shared/';
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
  readonly baseCost: number;
  /**
   * Cost in CIC to convert to.
   */
  @Expose({ name: 'base_cost_conversion' })
  readonly baseCostConversion: number;
  /**
   * Added cost per building level.
   */
  @Expose({ name: 'per_level_extra_cost' })
  readonly perLevelExtraCost: number;
  /**
   * The maximum level that can be built.
   */
  @Expose({ name: 'max_level' })
  readonly maxLevel: number;
  /**
   * The base health of the building. Is multiplied by the level of the building built.
   */
  @Expose()
  readonly value: number;
  /**
   * Which icon frame in GFX_buildings_strip to use for the building.
   */
  @Expose({ name: 'icon_frame' })
  readonly iconFrame: number;
  /**
   * The amount of <building> models to display on the map when one instance is built.
   */
  @Expose({ name: 'show_on_map' })
  readonly showOnMap: number;
  /**
   * Number of models to display.
   */
  @Expose({ name: 'show_on_map_meshes' })
  readonly showOnMapMeshes: number;
  /**
   * Whether to always show the <building> model.
   */
  @Expose({ name: 'always_shown' })
  readonly isAlwaysShown = false;
  /**
   * Whether to show destroyed mesh for building.
   */
  @Expose({ name: 'has_destroyed_mesh' })
  readonly hasDestroyedMesh = false;
  /**
   * Determines if this building uses building slots.
   */
  @Expose({ name: 'shares_slots' })
  readonly hasSharesSlots = false;
  /**
   * Determines if this building benefits from infrastructure boosting construction speed.
   */
  @Expose({ name: 'infrastructure_construction_effect' })
  readonly hasInfrastructureConstructionEffect = false;
  /**
   * Determines if this building is a province building.
   */
  @Expose({ name: 'provincial' })
  readonly isProvincial = false;
  /**
   * Modifies damage taken from bombing.
   */
  @Expose({ name: 'damage_factor' })
  readonly damageFactor = 0;
  /**
   * Limits this building to only coastal provinces/states.
   */
  @Expose({ name: 'only_costal' })
  readonly isOnlyCoastal = false;
  /**
   * Limits this building, disabling in a DMZ state.
   */
  @Expose({ name: 'disabled_in_dmz' })
  readonly isDisabledInDMZ = false;
  /**
   * Determines if this building is considered infrastructure.
   */
  @Expose({ name: 'infrastructure' })
  readonly isInfrastructure = false;
  /**
   * Determines if this building is considered an air base.
   */
  @Expose({ name: 'air_base' })
  readonly isAirBase = false;
  /**
   * Determines if this building is considered a port.
   */
  @Expose({ name: 'is_port' })
  readonly isPort = false;
  /**
   * Determines if this building is considered an anti-air installation.
   */
  @Expose({ name: 'anti_air' })
  readonly isAntiAir = false;
  /**
   * Determines if this building is considered a refinery.
   */
  @Expose({ name: 'refinery' })
  readonly isRefinery = false;
  /**
   * Determines if this building is considered a radar station.
   */
  @Expose({ name: 'radar' })
  readonly isRadar = false;
  /**
   * Determines if this building is considered a nuclear reactor.
   */
  @Expose({ name: 'nuclear_reactor' })
  readonly isNuclearReactor = false;
  /**
   * Adds X amount of MIC production. <This functions like a boolean, you will get 1 MIC, setting a higher number will not add any more MIC
   */
  @Expose({ name: 'military_production' })
  readonly militaryProduction = 0;
  /**
   * Adds X amount of CIC production. <This functions like a boolean, you will get 1 CIC, setting a higher number will not add any more CIC
   */
  @Expose({ name: 'general_production' })
  readonly generalProduction = 0;
  /**
   * Adds X amount of NIC production. <This functions like a boolean, you will get 1 NIC, setting a higher number will not add any more NIC
   */
  @Expose({ name: 'naval_production' })
  readonly navalProduction = 0;
  /**
   * Adds X amount of land fort.
   */
  @Expose({ name: 'land_fort' })
  readonly landFort = 0;
  /**
   * Adds X amount of naval fort.
   */
  @Expose({ name: 'naval_fort' })
  readonly navalFort = 0;
  /**
   * Adds X amount of rocket production.
   */
  @Expose({ name: 'rocket_production' })
  readonly rocketProduction = 0;
  /**
   * Adds X amount of rocket capacity.
   */
  @Expose({ name: 'rocket_launch_capacity' })
  readonly rocketLaunchCapacity = 0;

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
