import { GenericManager } from '@shared/';
import { Resource } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class ResourceManager extends GenericManager<Resource> {
  protected readonly wildcards = ['common/resources/*_resources.txt'];

  make(id: Resource['id']): Resource {
    return new Resource(this.product, id);
  }

  async get(id: Resource['id']) {
    const resources = await this.load();
    return resources.find((resource) => resource.id === id);
  }

  protected async processFile({ path }): Promise<Resource[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['resources']).map(
      ([id, data]) =>
        plainToClassFromExist(this.make(id), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        }),
    );
  }
}
