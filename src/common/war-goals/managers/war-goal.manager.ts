import { GenericManager } from '@shared/';
import { WarGoal } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class WarGoalManager extends GenericManager<WarGoal> {
  protected readonly wildcards = ['common/wargoals/**/*.txt'];

  make(id: WarGoal['id']): WarGoal {
    return new WarGoal(this.product, id);
  }

  async get(id: WarGoal['id']) {
    const opinionModifiers = await this.load();
    return opinionModifiers.find(
      (opinionModifier) => opinionModifier.id === id,
    );
  }

  protected async processFile({ path }): Promise<WarGoal[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['wargoal_types']).map(
      ([id, data]) =>
        plainToClassFromExist(this.make(id), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        }),
    );
  }
}
