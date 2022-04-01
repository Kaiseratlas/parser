import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';

export class FieldMarshal extends ProductEntity {
  @Expose({ name: 'planning_skill' })
  readonly planningSkill = 0;
  @Expose({ name: 'logistics_skill' })
  readonly logisticsSkill = 0;
}