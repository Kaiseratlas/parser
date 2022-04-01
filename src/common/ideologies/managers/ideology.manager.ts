import { GenericManager } from '@shared/';
import { Jomini } from 'jomini';
import fs from 'fs';
import { Ideology } from '../classes';
import { plainToClassFromExist } from 'class-transformer';

export class IdeologyManager extends GenericManager<Ideology> {
  protected readonly wildcards = ['common/ideologies/**/*.txt'];

  async get(id: Ideology['id']) {
    const ideologies = await this.load();
    return ideologies.find((i) => i.id === id);
  }

  protected async processFile({ path }): Promise<Ideology[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['ideologies']).map(
      ([id, data]) =>
        plainToClassFromExist(new Ideology(this.product, id), data, {
          exposeDefaultValues: true,
          excludeExtraneousValues: true,
        }),
    );
  }
}
