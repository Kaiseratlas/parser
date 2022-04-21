import { GenericManager } from '@shared/';
import { CountryFlag } from '../classes';
import path from 'path';

export class CountryFlagManager extends GenericManager<CountryFlag> {
  protected readonly wildcards = ['gfx/flags/*.tga'];

  make(id: CountryFlag['id']): CountryFlag {
    return new CountryFlag(this.product, id);
  }

  protected async processFile({ path: fullPath }): Promise<CountryFlag[]> {
    const filename = path.parse(fullPath).name;
    return [this.make(filename)];
  }
}
