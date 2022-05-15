import { Expose } from 'class-transformer';
import { Commander } from './commander.class';

export class FieldMarshal extends Commander {
  static readonly Key = 'field_marshal';

  @Expose({ name: 'planning_skill' })
  readonly planningSkill: number = 0;
  @Expose({ name: 'logistics_skill' })
  readonly logisticsSkill: number = 0;
}
