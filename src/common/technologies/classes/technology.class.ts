import { ProductEntity, TransformToArray } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';
import { TechnologyCategory } from './technology-category.class';
import { TechnologySharingGroup } from './technology-sharing-group.class';

export class Technology extends ProductEntity {
  static readonly Category = TechnologyCategory;
  static readonly SharingGroup = TechnologySharingGroup;

  constructor(product: Product, readonly id: string) {
    super(product);
  }

  /**
   * Consider this technology a doctrine technology.
   */
  @Expose({ name: 'doctrine' })
  readonly isDoctrine: boolean = false;
  /**
   * Cost in time, where 1 is the default research time length.
   */
  @Expose({ name: 'research_cost' })
  readonly researchCost: number = 1;
  /**
   * Which year this technology stops receiving ahead-of-time penalties.
   */
  @Expose({ name: 'start_year' })
  readonly startYear: number;
  /**
   * Displays effects in description.
   */
  @Expose({ name: 'show_effect_as_desc' })
  readonly showEffectAsDescription: boolean = false;
  @Expose({ name: 'sub_technologies' })
  readonly subTechnologies: string[] = [];
  /**
   * Which technology categories apply to this technology.
   * @protected
   */
  @Expose()
  @TransformToArray()
  protected readonly categories: TechnologyCategory['id'][] = [];

  getName() {
    return this.product.i18n.t({ key: this.id });
  }

  getDescription() {
    return this.product.i18n.t({ key: `${this.id}_desc` });
  }

  async getCategories() {
    const categories = await this.product.common.technologies.categories.load();
    return categories.filter((category) =>
      this.categories.includes(category.id),
    );
  }
}
