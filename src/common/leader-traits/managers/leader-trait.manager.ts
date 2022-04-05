import { GenericManager } from '@shared/';
import { LeaderTrait } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class LeaderTraitManager extends GenericManager<LeaderTrait> {
  protected readonly wildcards = ['common/country_leader/**/*.txt'];

  make(id: LeaderTrait['id']): LeaderTrait {
    return new LeaderTrait(this.product, id);
  }

  async get(id: LeaderTrait['id']) {
    const leaderTraits = await this.load();
    return leaderTraits.find((leaderTrait) => leaderTrait.id === id);
  }

  protected async processFile({ path }): Promise<LeaderTrait[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['leader_traits']).map(
      ([id, data]) => {
        return plainToClassFromExist(this.make(id), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        });
      },
    );
  }
}
