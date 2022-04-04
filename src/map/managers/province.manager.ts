import { Province } from '../classes';
import { GenericManager } from '@shared/';
import fs from 'fs';
import csv from 'csv-parser';
import { plainToClassFromExist } from 'class-transformer';
import type { ProvinceHeader } from '../enums';

export class ProvinceManager extends GenericManager<Province> {
  protected readonly wildcards = ['map/definition.csv'];
  protected readonly csv = csv({
    separator: ';',
    headers: false,
    mapValues: this.transformValues,
  });

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

  protected async processFile({ path }): Promise<Province[]> {
    const results = await new Promise<any[]>((resolve, reject) => {
      const results = [];
      fs.createReadStream(path)
        .pipe(this.csv)
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results));
    });
    return results.map((entry) =>
      plainToClassFromExist(this.make(), entry, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
