import { Commander } from './commander.class';
import { Expose } from 'class-transformer';

export class NavyLeader extends Commander {
  @Expose({ name: 'maneuvering_skill' })
  readonly maneuveringSkill = 0;
  @Expose({ name: 'coordination_skill' })
  readonly coordinationSkill = 0;
}
