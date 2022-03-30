import { GenericManager } from './generic.manager';
import { AutonomyState } from '../classes/autonomy-state.class';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToInstance } from 'class-transformer';

export class AutonomyStateManager extends GenericManager<AutonomyState> {
  protected readonly wildcards = ['common/autonomous_states/**/*.txt'];

  async get(id: string) {
    const as = await this.load();
    return as.find((s) => s.id === id);
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return [
      plainToInstance(AutonomyState, data['autonomy_state'], {
        excludeExtraneousValues: true,
      }),
    ];
  }
}
