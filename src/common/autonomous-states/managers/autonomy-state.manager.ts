import { GenericManager } from '@shared/';
import { AutonomyState } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class AutonomyStateManager extends GenericManager<AutonomyState> {
  protected readonly wildcards = ['common/autonomous_states/**/*.txt'];

  protected make(): AutonomyState {
    return new AutonomyState(this.product);
  }

  protected async processFile({ path }) {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return [
      plainToClassFromExist(this.make(), data['autonomy_state'], {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    ];
  }
}
