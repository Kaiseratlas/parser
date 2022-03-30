import { Province } from '../classes';
import { GenericManager } from '@shared/';
import fs from 'fs';
import csv from 'csv-parser';
import { plainToClassFromExist } from 'class-transformer';

enum ProvinceHeader {
  ID,
  RED_VALUE,
  GREEN_VALUE,
  BLUE_VALUE,
  TYPE,
  IS_COASTAL,
  TERRAIN,
  CONTINENT_ID,
}

export class ProvinceManager extends GenericManager<Province> {
  protected readonly wildcards = ['map/definition.csv'];
  protected readonly csv = csv({
    separator: ';',
    headers: false,
    mapValues: this.transformValues,
  });

  protected transformValues({
    index,
    value,
  }: {
    index: ProvinceHeader;
    value: unknown;
  }): unknown {
    switch (index) {
      case ProvinceHeader.ID:
      case ProvinceHeader.RED_VALUE:
      case ProvinceHeader.GREEN_VALUE:
      case ProvinceHeader.BLUE_VALUE:
      case ProvinceHeader.CONTINENT_ID: {
        return Number(value);
      }
      case ProvinceHeader.IS_COASTAL: {
        return value === 'true';
      }
      case ProvinceHeader.TYPE:
      case ProvinceHeader.TERRAIN:
      default: {
        return value;
      }
    }
  }

  async get(id: number): Promise<Province> {
    const provinces = await this.load();
    return provinces.find((province) => province.id === id);
  }

  protected async processFile({ path }): Promise<Province[]> {
    const results = await new Promise<any[]>((resolve, reject) => {
      const results = [];
      fs.createReadStream(path)
        .pipe(this.csv)
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results));
    });
    return results.map((entry) =>
      plainToClassFromExist(new Province(this.product), entry, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
