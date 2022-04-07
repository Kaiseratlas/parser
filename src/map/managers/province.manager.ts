import { Province } from '../classes';
import { CsvEntityManager } from '@shared/';
import type { ProvinceHeader } from '../enums';

export class ProvinceManager extends CsvEntityManager<Province> {
  protected readonly wildcards = ['map/definition.csv'];

  make(): Province {
    return new Province(this.product);
  }

  protected transformValues({
    index,
    value,
  }: {
    index: ProvinceHeader;
    value: unknown;
  }): unknown {
    switch (index) {
      case Province.Header.ID:
      case Province.Header.RED_VALUE:
      case Province.Header.GREEN_VALUE:
      case Province.Header.BLUE_VALUE:
      case Province.Header.CONTINENT_ID: {
        return Number(value);
      }
      case Province.Header.IS_COASTAL: {
        return value === 'true';
      }
      case Province.Header.TYPE:
      case Province.Header.TERRAIN:
      default: {
        return value;
      }
    }
  }
}
