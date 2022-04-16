import { Expose, Transform } from 'class-transformer';
import { convertToArray, ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import type { Sprite } from '../../../interface';
import Color from 'color';
import type {
  GetLocalisationOptions,
  Localisation,
} from '../../../localisation';

/**
 * Ideologies represent all the different political beliefs or alignments in the selected nation.
 * An ideology will help to determine the choices and paths that the nation will take.
 */
export class Ideology extends ProductEntity {
  constructor(product: Product, id: Ideology['id']) {
    super(product);
    this.id = id;
  }
  readonly id: string;
  @Expose()
  readonly name: string;
  @Expose({ name: 'dynamic_faction_names' })
  @Transform(({ value }) => convertToArray(value))
  readonly dynamicFactionNames: string[];
  @Expose()
  readonly grouping: string;
  @Expose()
  readonly description: string;
  /**
   * Can you boost this ideology popularity in another country
   */
  @Expose({ name: 'can_be_boosted' })
  readonly canBeBoosted: boolean = true;
  @Expose({ name: 'can_collaborate' })
  readonly canCollaborate: boolean = false;

  /**
   * RGB ideology colour, used in the political pie chart or next to the chart.
   */
  @Expose()
  @Transform(({ value }) => Color.rgb(...value))
  readonly color: Color | null = null;

  // https://hoi4.paradoxwikis.com/Ideology_modding#GFX
  getIcon(): Promise<Sprite> {
    return this.product.interface.sprites.get(`GFX_ideology_${this.id}_group`);
  }

  getName(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    return this.product.localisation.translate({
      key: this.id,
      ...o,
    });
  }

  getNoun(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    return this.product.localisation.translate({
      key: `${this.id}_noun`,
      ...o,
    });
  }

  getGrouping(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    return this.product.localisation.translate({
      key: `${this.id}_desc`,
      ...o,
    });
  }

  getDrift(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    return this.product.localisation.translate({
      key: `${this.id}_drift`,
      ...o,
    });
  }

  getBanned(
    o: Omit<GetLocalisationOptions, 'key' | 'version'> = {},
  ): Promise<Localisation> {
    return this.product.localisation.translate({
      key: `${this.id}_banned`,
      ...o,
    });
  }
}
