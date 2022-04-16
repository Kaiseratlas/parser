import type { Entry } from 'fast-glob';
import type { Product } from '../../core';
import type { ProductEntity } from '../classes';
import { debug } from '../utils';
import { nanoid } from 'nanoid';

export interface LoadEntitiesOptions {
  readonly nocache?: boolean;
  readonly wildcards?: string[];
}

export abstract class GenericManager<T extends ProductEntity> {
  constructor(protected readonly product: Product) {
    this.product = product;
    this.debug = debug.extend(this.constructor.name);
  }
  protected readonly debug: debug.Debugger;
  protected readonly wildcards: string[];
  protected readonly cache = new Map<T['id'], T>();

  async get(id: T['id'], o?: LoadEntitiesOptions): Promise<T> {
    const debug = this.debug.extend(nanoid(5));
    debug('get an entity with id %s with options %o', id, o);
    if (!o?.nocache && this.cache.has(id)) {
      debug('loading from a cache...');
      return this.cache.get(id);
    }
    debug('no cache was found, reloading...');
    await this.load(o);
    debug('loading from the cache again...');
    return this.cache.get(id);
  }

  abstract make(...args: unknown[]): T;
  protected abstract processFile({ path }: Entry): Promise<T[]>;

  async load(o?: LoadEntitiesOptions): Promise<T[]> {
    const debug = this.debug.extend(nanoid(5));
    debug('loading entities...');
    if (this.cache.size) {
      debug('loading from a cache...');
      return [...this.cache.values()];
    }

    const entries = await this.product.fg(this.wildcards);
    debug(
      'matched %d entries: %O',
      entries.length,
      entries.map((entry) => entry.path),
    );
    const entities = await Promise.all(
      entries.map<T>(this.processFile.bind(this)),
    );
    const result = entities.flat() as T[];
    debug('%d entities has been found, writing a cache...', result.length);
    this.updateCache(result);
    if (o?.nocache) {
      debug('a cache was disabled, retuning %d results...', result.length);
      return result;
    }
    debug('loading from the cache again...');
    return [...this.cache.values()];
  }

  protected updateCache(entities: T[]): void {
    entities.forEach((entity) => this.cache.set(entity.id, entity));
  }
}
