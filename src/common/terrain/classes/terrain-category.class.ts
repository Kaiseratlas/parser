import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import Color from 'color';
import { Expose, Transform } from 'class-transformer';
import type { Sprite } from '../../../interface';

/**
 * Terrain Category.
 */
export class TerrainCategory extends ProductEntity {
  static readonly GfxPrefix = 'GFX_terrain';

  constructor(product: Product, readonly id: string) {
    super(product);
  }

  @Expose({ name: 'is_water' })
  readonly isWater: boolean = false;
  @Expose()
  @Transform(({ value }) => Color.rgb(...value))
  readonly color: Color;
  /**
   * Increases the distance units have to travel by this factor.
   */
  @Expose({ name: 'movement_cost' })
  readonly movementCost: number = 0;
  /**
   * Maximum amount of battalions that can fight in a province.
   */
  @Expose({ name: 'combat_width' })
  readonly combatWidth: number = 0;
  @Expose({ name: 'combat_support_width' })
  readonly combatSupportWidth: number = 0;
  @Expose({ name: 'ai_terrain_importance_factor' })
  readonly aiTerrainImportanceFactor: number;
  @Expose({ name: 'match_value' })
  readonly matchValue: number = 0;
  @Expose({ name: 'sound_type' })
  readonly soundType: string;
  /**
   * If the enemy has air superiority, their bonus is reduced by this amount.
   */
  @Expose({ name: 'enemy_army_bonus_air_superiority_factor' })
  readonly enemyArmyBonusAirSuperiorityFactor: number = 0;
  /**
   * Reduces the flow of hub supply into a province with this terrain.
   */
  @Expose({ name: 'supply_flow_penalty_factor' })
  readonly supplyFlowPenaltyFactor: number = 0;
  /**
   * Increases the rate of attrition for trucks used to motorize supply hubs in this terrain.
   */
  @Expose({ name: 'truck_attrition_factor' })
  readonly truckAttritionFactor: number = 0;

  getName() {
    return this.product.i18n.t({ key: this.id });
  }

  getDescription() {
    return this.product.i18n.t({ key: `${this.id}_desc` });
  }

  getGraphics(): Promise<Sprite> {
    return this.product.interface.sprites.get(
      `${TerrainCategory.GfxPrefix}_${this.id}`,
    );
  }

  getGraphicsWinter(): Promise<Sprite> {
    return this.product.interface.sprites.get(
      `${TerrainCategory.GfxPrefix}_${this.id}_winter`,
    );
  }
}
