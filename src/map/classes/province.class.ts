import { ProductEntity } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import Color from 'color';
import { ProvinceType } from '../enums';

export class Province extends ProductEntity {
  static readonly Type = ProvinceType;

  @Expose({ name: '0' })
  readonly id: number;
  @Expose()
  @Transform(({ obj }) => {
    return Color.rgb(obj['1'], obj['2'], obj['3']);
  })
  readonly color: Color;
  @Expose({ name: '4' })
  readonly type: ProvinceType;
  @Expose({ name: '5' })
  readonly isCoastal: number;
  @Expose({ name: '6' })
  readonly terrain: string;
  @Expose({ name: '7' })
  protected readonly continentId: number;
}