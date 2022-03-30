import { State } from '../classes/state.class';
import { GenericManager } from './generic.manager';
import fs from 'fs';
import { Jomini } from 'jomini';
import { x } from './sprite.manager';
import { plainToClassFromExist } from 'class-transformer';

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
      const state = new State(this.product);
      return plainToClassFromExist(state, s, { excludeExtraneousValues: true });
    });
  }
}
