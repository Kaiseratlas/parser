import { Expose } from 'class-transformer';
import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';

import type { CountryLeader } from './country-leader.class';
import type { Advisor } from './advisor.class';
import type { FieldMarshal } from './field-marshal.class';
import { CharacterPortraitType, Gender } from '../enums';
import type { CharacterPortrait } from './character-portrait.class';

type CharacterRole = Advisor | CountryLeader | FieldMarshal;

export class Character extends ProductEntity {
  static readonly Gender = Gender;

  constructor(product: Product, id: Character['id']) {
    super(product);
    this.id = id;
  }

  /**
   * The character id, used in effects and triggers to reference the character
   */
  readonly id: string;
  /**
   * The name used for the character. Can be plain text or point to a localisation key
   */
  @Expose()
  readonly name: string;

  getName() {
    return this.product.i18n.t({ key: this.name });
  }

  /**
   * Used to set the gender of the character
   */
  @Expose()
  readonly gender = Character.Gender.MALE;

  protected readonly portraitMap = new Map<
    CharacterPortraitType,
    CharacterPortrait
  >();

  /**
   * The portraits used in game for the characters
   */
  get portraits(): Record<CharacterPortraitType, CharacterPortrait> {
    return {
      civilian: this.portraitMap.get(CharacterPortraitType.CIVILIAN),
      army: this.portraitMap.get(CharacterPortraitType.ARMY),
      navy: this.portraitMap.get(CharacterPortraitType.NAVY),
    };
  }

  addPortrait(
    type: CharacterPortraitType,
    portrait: CharacterPortrait,
  ): Character {
    this.portraitMap.set(type, portrait);
    return this;
  }

  readonly roles: CharacterRole[] = [];

  addRole(...roles: CharacterRole[]): Character {
    this.roles.push(...roles);
    return this;
  }
}
