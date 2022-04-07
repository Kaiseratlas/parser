import type { ProductEntity } from '@shared/';
import { GenericManager } from './generic.manager';
import fs from 'fs';
import csv from 'csv-parser';
import { plainToClassFromExist } from 'class-transformer';

export abstract class CsvEntityManager<
  T extends ProductEntity,
> extends GenericManager<T> {
  protected get csv() {
    return csv({
      separator: ';',
      headers: false,
      mapValues: this.transformValues,
      skipComments: true,
      strict: true,
      ...this.options,
    });
  }

  protected readonly options: csv.Options = {};

  protected abstract transformValues({
    index,
    value,
  }: {
    index: number;
    value: unknown;
  }): unknown;

  protected serialize(entry: Record<string, unknown>): T {
    return plainToClassFromExist(this.make(), entry, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }

  protected async processFile({ path }): Promise<T[]> {
    const results = await new Promise<unknown[]>((resolve, reject) => {
      const results = [];
      fs.createReadStream(path)
        .pipe(this.csv)
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results));
    });
    return results
      .filter((data) => Object.keys(data).length)
      .map(this.serialize.bind(this));
  }
}
