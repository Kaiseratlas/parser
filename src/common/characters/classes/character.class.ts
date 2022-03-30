import { Expose } from 'class-transformer';
import { ProductEntity } from '@shared/';

import type { CountryLeader } from './country-leader.class';
import type { Advisor } from './advisor.class';
import type { FieldMarshal } from './field-marshal.class';

export type CharacterRole = Advisor | CountryLeader | FieldMarshal;

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
