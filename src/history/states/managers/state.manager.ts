import { State } from '../classes';
import { convertToArray, GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { StateHistory } from '../classes/state-history.class';

export class StateManager extends GenericManager<State> {
  protected readonly wildcards = ['history/states/**/*.txt'];

  make(history: State['history']): State {
    return new State(this.product, history);
  }

  protected async processFile({ path }): Promise<State[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return convertToArray(data['state']).map((s) => {
      const history = plainToClassFromExist(
        new StateHistory(this.product),
        s['history'],
        {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        },
      );
      return plainToClassFromExist(this.make(history), s, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });
    });
  }
}
