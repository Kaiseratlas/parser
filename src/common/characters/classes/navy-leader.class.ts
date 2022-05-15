import { Commander } from './commander.class';
import { Expose } from 'class-transformer';

export class NavyLeader extends Commander {
  static readonly Key = 'navy_leader';

  @Expose({ name: 'maneuvering_skill' })
  readonly maneuveringSkill: number = 0;
  @Expose({ name: 'coordination_skill' })
  readonly coordinationSkill: number = 0;
}
