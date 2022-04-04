import { GenericManager } from '@shared/';
import { Continent } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { x } from '../../interface';

export class ContinentManager extends GenericManager<Continent> {
  protected readonly wildcards = ['map/continent.txt'];

  make(id, name): Continent {
    return new Continent(this.product, id, name);
  }

  protected async processFile({ path }): Promise<Continent[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return x(data['continents']).map((name, id) => this.make(id, name));
  }
}
