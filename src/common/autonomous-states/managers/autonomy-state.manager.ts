import { GenericManager } from '@shared/';
import { AutonomyState } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

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
      plainToClassFromExist(
        new AutonomyState(this.product),
        data['autonomy_state'],
        {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        },
      ),
    ];
  }
}
