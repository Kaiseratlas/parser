import { Expose } from 'class-transformer';
import type { Focus } from './focus.class';
import { ProductEntity } from '@shared/';

type FocusMap = Map<Focus['id'], Focus>;

export class FocusTree extends ProductEntity {
  static readonly Key = 'focus_tree';

  @Expose()
  readonly id: string;

  protected readonly focusMap: FocusMap = new Map();

  get focuses() {
    return [...this.focusMap.values()];
  }

  getFocus(id: Focus['id']): Focus | null {
    return this.focusMap.get(id) ?? null;
  }

  addFocus(...focuses: Focus[]) {
    focuses.forEach((focus) => this.focusMap.set(focus.id, focus));
  }
}
