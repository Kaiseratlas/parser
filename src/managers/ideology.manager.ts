import { GenericManager } from './generic.manager';
import { Jomini } from 'jomini';
import fs from 'fs';
import { Ideology } from '../classes/ideology.class';
import { plainToClass } from 'class-transformer';

export class IdeologyManager extends GenericManager {
  private readonly cache: Map<Ideology['id'], Ideology> = new Map();
  protected readonly wildcards = ['common/ideologies/**/*.txt'];

  async get(id: string) {
    console.log('this.cache', this.cache);
    if (this.cache.has(id)) {
      console.log('from cache');
      return this.cache.get(id) ?? null;
    }

    await this.load();
    return this.cache.get(id) ?? null;
  }

  async load(): Promise<Ideology[]> {
    const parser = await Jomini.initialize();
    const entries = await this.fg();

    const promises = entries.map(async ({ path }) => {
      const out = await fs.promises.readFile(path);
      return parser.parseText(out);
    });

    const data = await Promise.all(promises);
    const res = data.reduce(
      (previousValue, currentValue) => ({ ...previousValue, ...currentValue }),
      {},
    );

    const ideologies = Object.values(res['ideologies']);

    Object.entries(res['ideologies']).forEach(([id, ideology]) => {
      const i = plainToClass(
        Ideology,
        // @ts-ignore
        { id, ...ideology },
        { excludeExtraneousValues: true },
      );
      this.cache.set(id, i);
    });

    return ideologies as Ideology[];
  }
}
