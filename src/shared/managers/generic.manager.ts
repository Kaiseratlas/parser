import fg, { Entry } from 'fast-glob';
import { Product } from '../classes';

interface LoadEntitiesOptions {
  wildcards?: string[];
}

export abstract class GenericManager<T = any> {
  protected readonly product: Product;
  protected readonly wildcards: string[];
  protected async processFile({ path }: Entry): Promise<T[]> {
    return [];
  }

  constructor(product: Product) {
    this.product = product;
  }

  async load(o?: LoadEntitiesOptions): Promise<T[]> {
    const entries = await this.fg(o);
    const entities = await Promise.all(
      entries.map(this.processFile.bind(this)),
    );
    return entities.flat() as T[];
  }

  protected fg(o?: LoadEntitiesOptions) {
    return fg(o?.wildcards ?? this.wildcards, {
      cwd: this.product.absolutePath,
      absolute: true,
      objectMode: true,
    });
  }
}
