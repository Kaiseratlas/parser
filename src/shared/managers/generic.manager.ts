import fg, { Entry } from 'fast-glob';
import type { Product } from '../../core';
import type { ProductEntity } from '../classes';

interface LoadEntitiesOptions {
  readonly nocache?: boolean;
  readonly wildcards?: string[];
}

export abstract class GenericManager<T extends ProductEntity> {
  constructor(protected readonly product: Product) {
    this.product = product;
  }
  protected readonly wildcards: string[];
  protected readonly cache = new Map<T['id'], T>();

  async get(id: T['id'], o?: LoadEntitiesOptions): Promise<T> {
    if (!o?.nocache && this.cache.has(id)) {
      return this.cache.get(id);
    }
    await this.load(o);
    return this.cache.get(id);
  }

  abstract make(...args: unknown[]): T;
  protected abstract processFile({ path }: Entry): Promise<T[]>;

  async load(o?: LoadEntitiesOptions): Promise<T[]> {
    console.log('reload all entities...');
    const entries = await this.fg(o);
    const entities = await Promise.all(
      entries.map<T[]>(this.processFile.bind(this)),
    );
    const result = entities.flat();
    this.updateCache(result);
    if (o?.nocache) {
      return result;
    }
    return [...this.cache.values()];
  }

  protected updateCache(entities: T[]): void {
    entities.forEach((entity) => this.cache.set(entity.id, entity));
  }

  protected fg(o?: LoadEntitiesOptions) {
    return fg(o?.wildcards ?? this.wildcards, {
      cwd: this.product.absolutePath,
      absolute: true,
      objectMode: true,
    });
  }
}
