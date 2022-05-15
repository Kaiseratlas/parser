import { ProductEntity } from '@shared/';
import { Expose } from 'class-transformer';

export abstract class Commander extends ProductEntity {
  @Expose()
  readonly skill: number = 0;
  @Expose({ name: 'attack_skill' })
  readonly attackSkill: number = 0;
  @Expose({ name: 'defense_skill' })
  readonly defenseSkill: number = 0;
}
