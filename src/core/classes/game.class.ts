import os from 'os';
import path from 'path';
import { ModManager } from '../managers';
import type { GameOptions } from '../options';

export class Game {
  protected constructor(readonly path: string, o?: GameOptions) {
    this.options = o;
  }

  protected readonly options?: GameOptions;

  static fromPath(path: Game['path'], o?: GameOptions) {
    return new Game(path, o);
  }

  resolvePath(...paths: string[]) {
    return path.join(this.path, ...paths);
  }

  readonly mods = new ModManager(this);

  get modPath() {
    if (this.options.modPath) {
      return this.options.modPath;
    }
    return path.join(
      os.homedir(),
      'Documents',
      'Paradox Interactive',
      'Hearts of Iron IV',
      'mod',
    );
  }
}
