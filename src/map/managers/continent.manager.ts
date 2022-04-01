import { GenericManager } from '@shared/';
import { Continent } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { x } from '../../interface';

export class ContinentManager extends GenericManager<Continent> {
  protected readonly wildcards = ['map/continent.txt'];

  async get(id: Continent['id']) {
    const continents = await this.load();
    return continents.find((continent) => continent.id === id);
  }

  protected async processFile({ path }): Promise<Continent[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return x(data['continents']).map(
      (name, id) => new Continent(this.product, id, name),
    );
  }
}
