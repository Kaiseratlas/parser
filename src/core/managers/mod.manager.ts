import { GenericManager } from '@shared/';
import fg from 'fast-glob';
import { Mod } from '../classes/mod.class';
import type { Game } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class ModManager {
  protected readonly wildcards = ['**/*.mod'];
  constructor(protected readonly game: Game) {}

  protected readonly cache = new Map();

  make(): Mod {
    return new Mod(this.game);
  }

  async get(name: Mod['name']) {
    const mod = this.cache.get(name);
    console.log('mod', mod);
    if (mod) {
      return mod;
    }
    if (!mod) {
      await this.load();
    }
    return this.cache.get(name);
  }

  async load(): Promise<Mod[]> {
    const entries = await this.fg();
    const entities = await Promise.all(
      entries.map<Mod[]>(this.processFile.bind(this)),
    );
    const result = entities.flat();
    this.updateCache(result);
    return result;
  }

  updateCache(result) {
    result.forEach((m) => this.cache.set(m.name, m));
  }

  protected async processFile({ path }): Promise<Mod[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    const mod = plainToClassFromExist(this.make(), data, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
    return [mod];
  }

  protected fg() {
    return fg(this.wildcards, {
      cwd: this.game.modPath,
      absolute: true,
      objectMode: true,
    });
  }
}
