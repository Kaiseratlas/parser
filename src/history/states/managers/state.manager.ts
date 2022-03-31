import { State } from '../classes';
import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { x } from '../../../interface';
import { plainToClassFromExist } from 'class-transformer';
import { StateHistory } from '../classes/state-history.class';

export class StateManager extends GenericManager<State> {
  protected readonly wildcards = ['history/states/**/*.txt'];

  async get(id: number): Promise<State> {
    const states = await this.load();
    return states.find((s) => s.id === id);
  }

  protected async processFile({ path }): Promise<State[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return x(data['state']).map((s) => {
      const history = plainToClassFromExist(
        new StateHistory(this.product),
        s['history'],
        {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        },
      );
      const state = plainToClassFromExist(new State(this.product, history), s, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });

      return state;
    });
  }
}
