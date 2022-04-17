import { ProductEntity } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import Color from 'color';
import { ProvinceHeader, ProvinceType } from '../enums';
import type { Continent } from './continent.class';
import type { State } from '../../history';
import type { TerrainCategory } from '../../common';

export class Province extends ProductEntity {
  static readonly Header = ProvinceHeader;
  static readonly Type = ProvinceType;

  @Expose({ name: '0' })
  readonly id: number;
  @Expose({ name: '1' })
  @Transform(({ obj }) => {
    return Color.rgb(obj['1'], obj['2'], obj['3']);
  })
  readonly color: Color;
  @Expose({ name: '4' })
  readonly type: ProvinceType;
  @Expose({ name: '5' })
  readonly isCoastal: boolean;

  belongsToContinent(continent: Continent | Continent['id']): boolean {
    if (typeof continent === 'object') {
      return this.continentId === continent.id;
    }
    return this.continentId === continent;
  }

  async getState(): Promise<State | null> {
    const states = await this.product.history.states.load();
    return states.find((state) => state.hasProvince(this)) ?? null;
  }

  @Expose({ name: '6' })
  protected readonly terrainCategoryId: TerrainCategory['id'];

  getTerrainCategory(): Promise<TerrainCategory> {
    return this.product.common.terrain.categories.get(this.terrainCategoryId);
  }

  @Expose({ name: '7' })
  protected readonly continentId: Continent['id'];

  getContinent(): Promise<Continent | null> {
    // if is ocean
    if (this.continentId === 0) {
      return null;
    }
    return this.product.map.continents.get(this.continentId);
  }
}
