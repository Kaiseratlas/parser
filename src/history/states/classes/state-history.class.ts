import { ProductEntity } from '@shared/';
import { Expose, Transform } from 'class-transformer';
import type { Province } from '../../../map';
import { x } from '../../../interface';

export class StateHistory extends ProductEntity {
  @Expose()
  protected readonly owner: string;
  @Expose()
  protected readonly controller: string | null = null;
  @Expose({ name: 'add_core_of' })
  @Transform(({ value }) => x(value))
  protected readonly coreTags: string[] = [];
  @Expose({ name: 'add_claim_by' })
  @Transform(({ value }) => x(value))
  protected readonly claimTags: string[] = [];
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
