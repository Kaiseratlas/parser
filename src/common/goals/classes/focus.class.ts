import { Expose, Transform } from 'class-transformer';
import { ProductEntity, TransformToArray } from '@shared/';
import type { Product } from '@shared/';
import type { FocusTree } from './focus-tree.class';
import type { Country } from '../../countries';
import { FocusFilter } from './focus-filter.class';

export class Focus extends ProductEntity {
  static readonly Key = 'focus';
  static readonly Filter = FocusFilter;

  constructor(product: Product, protected readonly tree: FocusTree) {
    super(product);
  }

  /**
   * The focus id. This can be any string you want.
   */
  @Expose()
  readonly id: string;

  getName() {
    return this.product.i18n.t({ key: this.id });
  }

  getDescription() {
    return this.product.i18n.t({ key: `${this.id}_desc` });
  }

  /**
   * The picture that goes with the focus. The name is defined in goals.gfx in /Hearts of Iron IV/interface.
   * To create a custom one you must follow the formatting in goals.gfx and add a shine in goals_shine.gfx in the same directory.
   * @protected
   */
  @Expose()
  protected readonly icon: string;

  getIcon() {
    return this.product.interface.sprites.get(this.icon);
  }

  @Expose({ name: 'prerequisite' })
  @TransformToArray()
  @Transform(({ value }) => value.map((v) => v.focus))
  protected readonly prerequisiteFocusIds: Focus['id'][] = [];

  get prerequisiteFocuses(): Focus[] {
    return this.prerequisiteFocusIds
      .map((focusId) => this.tree.getFocus(focusId))
      .filter(Boolean);
  }

  /**
   * The position on the focus tree horizontally.
   */
  @Expose()
  readonly x: number = 0;
  /**
   * The position on the focus tree vertically.
   */
  @Expose()
  readonly y: number = 0;
  /**
   * How long the focus takes to complete.
   * By default, it increases in sevens, so 1 would be 7 days, 10 would be 70 days, etc. Editable in the defines
   */
  @Expose()
  readonly cost: number = 0;

  /**
   * Makes the x and y values relative to the defined focus, which allows for negative values
   */
  @Expose({ name: 'relative_position_id' })
  protected readonly relativePositionId: Focus['id'] = null;

  get relativePositionFocus(): Focus | null {
    if (!this.relativePositionId) {
      return null;
    }
    return this.tree.getFocus(this.relativePositionId);
  }

  /**
   * Makes the x and y values relative to the defined focus, which allows for negative values
   */
  @Expose({ name: 'mutually_exclusive' })
  protected readonly mutuallyExclusive: Focus['id'] = null;

  get mutuallyExclusiveFocus(): Focus | null {
    if (!this.mutuallyExclusive) {
      return null;
    }
    return this.tree.getFocus(this.mutuallyExclusive);
  }

  /**
   * Will make it so a focus can not be completed if the country has capitulated
   */
  @Expose({ name: 'available_if_capitulated' })
  readonly availableIfCapitulated: boolean = false;

  /**
   * Will make it so a focus will cancel if the trigger
   */
  @Expose({ name: 'cancel_if_invalid' })
  readonly cancelIfInvalid: boolean = true;

  /**
   * Will make it so a focus will continue even if the triggers (available = { } ) become false.
   * Same as "cancel_if_invalid" but with an inverse logic
   */
  @Expose({ name: 'continue_if_invalid' })
  readonly continueIfInvalid: boolean = false;

  /**
   * Is normally given to focuses granting war goals (or generally expected to lead to a war).
   * It will give the <tag> an UI warning about war goal justification.
   * It also prompts the AI to prepare for a war with ROOT country.
   */
  @Expose({ name: 'will_lead_to_war_with' })
  protected readonly willLeadToWarWith: Country['tag'] = null;

  getCountryToWarWith(): Promise<Country | null> {
    if (!this.willLeadToWarWith) {
      return null;
    }
    return this.product.common.countries.get(this.willLeadToWarWith);
  }

  @Expose({ name: 'search_filters' })
  @TransformToArray()
  protected readonly searchFiltersId: string[] = [];

  get searchFilters(): FocusFilter[] {
    return this.searchFiltersId.map(
      (filterId) => new Focus.Filter(this.product, filterId),
    );
  }
}
