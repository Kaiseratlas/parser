import { ProductEntity } from '@shared/';
import { Expose, Transform } from 'class-transformer';

export class GameRuleOption extends ProductEntity {
  @Expose()
  @Transform(({ value }) => String(value))
  readonly name: string;
  @Expose()
  readonly text: string;
  getText() {
    return this.product.i18n.t({ key: this.text });
  }
  @Expose({ name: 'desc' })
  readonly description: string;
  getDescription() {
    return this.product.i18n.t({ key: this.description });
  }
  @Expose({ name: 'allow_achievements' })
  readonly allowAchievements: boolean = false;
}
