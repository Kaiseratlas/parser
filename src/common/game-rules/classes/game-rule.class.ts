import { ProductEntity } from '@shared/';
import type { Product } from '@shared/';
import { Expose } from 'class-transformer';
import { GameRuleOption } from './game-rule-option.class';
import type { Sprite } from '../../../interface';
import { GameRuleGroup } from './game-rule-group.class';

export class GameRule extends ProductEntity {
  static readonly Group = GameRuleGroup;
  static readonly Option = GameRuleOption;

  constructor(
    product: Product,
    readonly group: GameRuleGroup,
    readonly id: string,
  ) {
    super(product);
  }

  @Expose()
  protected readonly name: string;

  getName() {
    return this.product.i18n.t({ key: this.name });
  }

  @Expose()
  protected readonly icon: string = null;

  getIcon(): Promise<Sprite> {
    if (!this.icon) {
      return null;
    }
    return this.product.interface.sprites.get(this.icon);
  }

  readonly options: GameRuleOption[] = [];

  addOptions(...options: GameRuleOption[]) {
    this.options.push(...options);
  }
}
