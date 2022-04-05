import { Expose, Transform } from 'class-transformer';
import { x } from '../../interface';
import type { Game } from './game.class';
import path from 'path';

export class Mod {
  constructor(protected readonly game: Game) {}

  resolvePath(...paths: string[]) {
    return path.join(this.game.modPath, '..', this.path, ...paths);
  }

  @Expose()
  readonly name: string;
  @Expose()
  readonly path: string;
  @Expose()
  readonly picture: string;
  @Expose()
  readonly version: string;
  @Expose({ name: 'supported_version' })
  readonly supportedVersion: string;
  @Expose()
  readonly tags: string[];
  @Expose({ name: 'remote_file_id' })
  readonly remoteFileId: number | null = null;
  @Expose({ name: 'replace_path' })
  @Transform(({ value }) => x(value))
  readonly replacePaths: string[] = [];
  @Expose({ name: 'user_dir' })
  readonly userDir: string | null = null;
  @Expose()
  readonly dependencies: Mod['name'][] = [];

  async getSubmods(): Promise<Mod[]> {
    const mods = await this.game.mods.load();
    return mods.filter((mod) => mod.dependencies.includes(this.name));
  }

  addDependency(...mods: Mod[] | Mod['name'][]) {
    mods.forEach((mod) => {
      switch (typeof mod) {
        case 'string': {
          return this.dependencies.push(mod);
        }
        default: {
          return this.dependencies.push(mod.name);
        }
      }
    });
  }
}
