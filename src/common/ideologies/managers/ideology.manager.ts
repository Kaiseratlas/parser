import { GenericManager } from '@shared/';
import { Jomini } from 'jomini';
import fs from 'fs';
import { Ideology } from '../classes';
import { plainToClassFromExist } from 'class-transformer';

export class IdeologyManager extends GenericManager<Ideology> {
  protected readonly wildcards = ['common/ideologies/**/*.txt'];

  make(id: Ideology['id']): Ideology {
    return new Ideology(this.product, id);
  }

  protected async processFile({ path }): Promise<Ideology[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['ideologies']).map(
      ([id, data]) =>
        plainToClassFromExist(this.make(id), data, {
          exposeDefaultValues: true,
          excludeExtraneousValues: true,
        }),
    );
  }
}
