import os from 'os';
import path from 'path';
import { ModManager } from '../managers';

export class Game {
  protected constructor(readonly path: string) {}

  static fromPath(path: Game['path']) {
    return new Game(path);
  }

  resolvePath(...paths: string[]) {
    return path.join(this.path, ...paths);
  }

  readonly mods = new ModManager(this);

  get modPath() {
    return path.join(
      os.homedir(),
      'Documents',
      'Paradox Interactive',
      'Hearts of Iron IV',
      'mod',
    );
  }
}
