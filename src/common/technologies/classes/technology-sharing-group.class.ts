import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';
import type { Sprite } from '../../../interface';
import { TechnologyCategory } from './technology-category.class';

export class TechnologySharingGroup extends ProductEntity {
  /**
   * The ID of the technology sharing group to be used in the add_to_tech_sharing_group effect.
   */
  @Expose()
  readonly id: string;
  /**
   * The name of the technology sharing group defined in localisation.
   * @protected
   */
  @Expose({ name: 'name' })
  protected readonly name: string;
  /**
   * The description of the technology sharing group defined in localisation.
   * @protected
   */
  @Expose({ name: 'desc' })
  protected readonly description: string;
  /**
   * The GFX used for the technology sharing group in the technology select screen.
   * @protected
   */
  @Expose()
  protected readonly picture: string;

  getPicture(): Promise<Sprite> {
    return this.product.interface.sprites.get(this.picture);
  }

  /**
   * The bonus in percentage on speed of researching a tech per a country that researched it.
   */
  @Expose({ name: 'research_sharing_per_country_bonus' })
  readonly researchSharingPerCountryBonus: number;
  /**
   * If specified, only technologies in these select categories will have the bonus applied to them.
   * @protected
   */
  @Expose()
  protected readonly categories: TechnologyCategory['id'][] = [];

  getName() {
    return this.product.i18n.t({ key: this.name });
  }

  getDescription() {
    return this.product.i18n.t({ key: this.description });
  }

  async getCategories(): Promise<TechnologyCategory[]> {
    const categories = await this.product.common.technologies.categories.load();
    return categories.filter((category) =>
      this.categories.includes(category.id),
    );
  }
}
