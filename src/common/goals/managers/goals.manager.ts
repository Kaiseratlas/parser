import { Focus } from '../classes';
import { GenericManager } from '@shared/';
import { FocusTreeManager } from './focus-tree.manager';

export class GoalsManager extends GenericManager<Focus> {
  readonly trees = new FocusTreeManager(this.product);

  // TODO:
  make(): Focus {
    return undefined;
  }

  async get(id: Focus['id']): Promise<Focus> {
    const trees = await this.trees.load();
    const tree = trees.find((tree) => tree.getFocus(id));
    return tree.getFocus(id);
  }

  async load(o?): Promise<Focus[]> {
    const trees = await this.trees.load(o);
    return trees.flatMap((tree) => tree.focuses);
  }

  protected async processFile(): Promise<Focus[]> {
    return [];
  }
}
