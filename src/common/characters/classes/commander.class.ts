import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';

export class Commander extends ProductEntity {
  @Expose()
  readonly skill = 0;
  @Expose({ name: 'attack_skill' })
  readonly attackSkill = 0;
  @Expose({ name: 'defense_skill' })
  readonly defenseSkill = 0;
}
