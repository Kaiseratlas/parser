import { Commander } from './commander.class';
import { Expose } from 'class-transformer';

export class CorpsCommander extends Commander {
  static readonly Key = 'corps_commander';

  @Expose({ name: 'planning_skill' })
  readonly planningSkill: number = 0;
  @Expose({ name: 'logistics_skill' })
  readonly logisticsSkill: number = 0;
}
