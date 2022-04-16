import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { CharacterPortraitType } from '../enums';
import { Expose, Transform } from 'class-transformer';
import type { Sprite } from '../../../interface';
import type { Character } from './character.class';

export class CharacterPortrait extends ProductEntity {
  static readonly Type = CharacterPortraitType;

  constructor(
    product: Product,
    readonly type: CharacterPortraitType,
    readonly character: Character,
  ) {
    super(product);
    this.character = character;
  }

  @Expose({ name: 'large' })
  @Transform(
    ({ obj }) =>
      new Map(
        ['large', 'small'].map((variant) => [variant, obj[variant] ?? null]),
      ),
  )
  protected readonly variants = new Map<string, string>();

  protected getVariant(variant: string): Sprite | null {
    if (!this.variants.has(variant)) {
      return null;
    }
    return this.product.interface.sprites.make(this.variants.get(variant));
  }

  get large(): Sprite | null {
    return this.getVariant('large');
  }

  get small(): Sprite | null {
    return this.getVariant('small');
  }
}
