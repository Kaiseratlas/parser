import { Product } from './product.class';
import { CommonManager } from '../../common';
import { EventManager } from '../../events';
import { HistoryManager } from '../../history';
import { InterfaceManager } from '../../interface';
import { LocalisationManager } from '../../localisation';
import { MapManager } from '../../map';
import fg, { Entry } from 'fast-glob';
import path from 'path';
import { Game } from './game.class';
import fs from 'fs';

export class Parser extends Product {
  static async initialize(game: Game) {
    const mods = await game.mods.load();
    return new Parser(game, mods);
  }

  resolve(...paths: string[]): string {
    const modPath = this.mods
      .map((mod) => mod.resolvePath(...paths))
      .find((path) => fs.existsSync(path));
    if (!modPath) {
      return this.game.resolvePath(...paths);
    }
    return modPath;
  }

  readonly common: CommonManager = new CommonManager(this);
  readonly events: EventManager = new EventManager(this);
  readonly history: HistoryManager = new HistoryManager(this);
  readonly interface: InterfaceManager = new InterfaceManager(this);
  readonly localisation: LocalisationManager = new LocalisationManager(this);
  readonly map: MapManager = new MapManager(this);

  get i18n() {
    return this.localisation;
  }

  get localization() {
    return this.localisation;
  }

  async fg(wildcards: string[]): Promise<Entry[]> {
    const ignore = this.mods
      .flatMap((mod) => mod.replacePaths)
      .map((p) => path.join(p, '**', '*.*'));
    const gameEntries = await fg(wildcards, {
      cwd: this.game.path,
      absolute: true,
      objectMode: true,
      ignore,
    });

    const gameEntriesMap = new Map(
      gameEntries.map((entry) => [entry.name, entry]),
    );
    // console.log('gameEntriesMap', gameEntriesMap);

    const modsEntries = await Promise.all(
      this.mods.map((mod) =>
        fg(wildcards, {
          cwd: path.join(this.game.modPath, '..', mod.path),
          absolute: true,
          objectMode: true,
        }),
      ),
    );
    const modEntriesMap = new Map(
      modsEntries.flat().map((entry) => [entry.name, entry]),
    );
    //console.log('modEntriesMap', modEntriesMap);
    const entriesMap = new Map([...gameEntriesMap, ...modEntriesMap]);
    return [...entriesMap.values()];
  }
}
