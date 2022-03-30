import { Expose } from 'class-transformer';
import { CountryLeader } from './country-leader.class';
import { ProductEntity } from './product-entity.class';

export class Advisor {}

export class Commander extends ProductEntity {
  @Expose()
  readonly skill = 0;
  @Expose({ name: 'attack_skill' })
  readonly attackSkill = 0;
  @Expose({ name: 'defense_skill' })
  readonly defenseSkill = 0;
}

export class CorpsCommander extends Commander {
  @Expose({ name: 'planning_skill' })
  readonly planningSkill = 0;
  @Expose({ name: 'logistics_skill' })
  readonly logisticsSkill = 0;
}

export class FieldMarshal extends ProductEntity {
  @Expose({ name: 'planning_skill' })
  readonly planningSkill = 0;
  @Expose({ name: 'logistics_skill' })
  readonly logisticsSkill = 0;
}

export class NavyLeader extends Commander {
  @Expose({ name: 'maneuvering_skill' })
  readonly maneuveringSkill = 0;
  @Expose({ name: 'coordination_skill' })
  readonly coordinationSkill = 0;
}

type CharacterRole = Advisor | CountryLeader | FieldMarshal;

export class Character extends ProductEntity {
  @Expose()
  readonly id: string;
  @Expose()
  readonly name: string;

  readonly roles: CharacterRole[] = [];

  addRole(...roles: CharacterRole[]): void {
    this.roles.push(...roles);
  }
}
