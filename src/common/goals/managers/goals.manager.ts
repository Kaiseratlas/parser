import { FocusTree } from '../classes/focus-tree.class';
import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToInstance } from 'class-transformer';

export function convertToArray(out: unknown | unknown[]) {
  if (!out) {
    return [];
  }

  if (Array.isArray(out)) {
    return out;
  }

  return [out];
}

export class GoalsManager extends GenericManager<FocusTree> {
  protected readonly wildcards = ['common/national_focus/**/*.txt'];

  async get(id: string) {
    const trees = await this.load();
    return trees.find((t) => t.id === id);
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    try {
      const data = parser.parseText(out);
      if (!data['focus_tree']) {
        return [];
      }

      const tree = plainToInstance(FocusTree, data['focus_tree'], {
        excludeExtraneousValues: true,
      });

      return [tree];
    } catch (e) {
      //console.log('e', e);
      return [];
    }
  }
}
