import { ProductEntity, convertToArray } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import type { Province } from '../../../map';
import type { Country } from '../../../common/countries';

/**
 * Scope defines the effects to execute when the state is loaded during history setup.
 * Typically, this is used to add ownership with owner = <tag> and add_core_of = <tag>.
 */
export class StateHistory extends ProductEntity {
  /**
   * Sets the owner of the state. Note that this is not an effect, unlike add_core_of.
   * @protected
   */
  @Expose()
  protected readonly owner: Country['tag'];

  isOwnedBy(owner: Country | Country['tag']) {
    if (typeof owner === 'string') {
      return this.owner === owner;
    }
    return this.owner === owner.tag;
  }

  /**
   * Get a state owner country
   */
  getOwner(): Promise<Country> {
    return this.product.common.countries.get(this.owner);
  }

  /**
   * Sets the controller of the state. Optional, will be owner by default.
   * @protected
   */
  @Expose()
  protected readonly controller: Country['tag'] | null = null;

  isControlledBy(controller: Country | Country['tag']) {
    if (!this.controller) {
      return this.isOwnedBy(controller);
    }
    if (typeof controller === 'string') {
      return this.controller === controller;
    }
    return this.controller === controller.tag;
  }

  /**
   * Get a state controller country
   */
  getController(): Promise<Country> {
    if (!this.controller) {
      return this.product.common.countries.get(this.owner);
    }
    return this.product.common.countries.get(this.controller);
  }

  /**
   * Sets the state as a core of the specified tag.
   * @protected
   */
  @Expose({ name: 'add_core_of' })
  @Transform(({ value }) => convertToArray(value))
  protected readonly coreTags: Country['tag'][] = [];

  isCoreOf(country: Country | Country['tag']): boolean {
    if (typeof country === 'string') {
      return this.coreTags.includes(country);
    }
    return this.coreTags.includes(country.tag);
  }

  async getCoreCountries(): Promise<Country[]> {
    const countries = await this.product.common.countries.load();
    return countries.filter((country) => this.coreTags.includes(country.tag));
  }

  @Expose({ name: 'add_claim_by' })
  @Transform(({ value }) => convertToArray(value))
  protected readonly claimTags: Country['tag'][] = [];

  hasClaimFrom(country: Country | Country['tag']): boolean {
    if (typeof country === 'string') {
      return this.claimTags.includes(country);
    }
    return this.claimTags.includes(country.id as string);
  }

  async getClaimantCountries(): Promise<Country[]> {
    const countries = await this.product.common.countries.load();
    return countries.filter((country) => this.claimTags.includes(country.tag));
  }

  @Expose({ name: 'victory_points' })
  @Transform(({ value }) => {
    const victoryPoints = new Map<Province['id'], number>();
    if (typeof value[0] === 'number') {
      victoryPoints.set(value[0], value[1]);
      return victoryPoints;
    }
    if (Array.isArray(value[0])) {
      value.forEach(([provinceId, points]) =>
        victoryPoints.set(provinceId, points),
      );
      return victoryPoints;
    }
    return value;
  })
  readonly victoryPoints = new Map<Province['id'], number>();
}
