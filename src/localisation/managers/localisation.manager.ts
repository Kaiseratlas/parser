import { GenericManager } from '@shared/';
import { Localisation } from '../classes';
import type { LocalisationOptions } from '../options';
import fs from 'fs';
import path from 'path';

const LOCALISATION_REGEX =
  /^\s*(?<key>\S+):(?<version>\d+)?\s*"(?<value>.*)"$/gm;

export type GetLocalisationOptions = Partial<
  Pick<LocalisationOptions, 'version' | 'lang'>
> &
  Pick<LocalisationOptions, 'key'>;

export class LocalisationManager extends GenericManager<Localisation> {
  protected readonly wildcards = ['localisation/**/*.yml'];
  // protected readonly wildcards = [
  //   'localisation/english/autonomy_l_english.yml',
  // ];

  protected readonly cache = new Map<
    Localisation['lang'],
    Map<Localisation['key'], Map<number, Localisation>>
  >();

  make(o: LocalisationOptions) {
    return new Localisation(this.product, o);
  }

  protected updateCache(localisations: Localisation[]) {
    localisations.forEach((localisation) => {
      if (!this.cache.has(localisation.lang)) {
        this.cache.set(localisation.lang, new Map());
      }
      const langDict = this.cache.get(localisation.lang);
      if (!langDict.has(localisation.key)) {
        langDict.set(localisation.key, new Map());
      }
      const translation = langDict.get(localisation.key);
      if (!translation.has(localisation.version)) {
        translation.set(localisation.version, localisation);
      }
    });
  }

  async get(o: GetLocalisationOptions): Promise<Localisation | null> {
    if (!o.lang) {
      o.lang = 'english';
    }
    if (!o.version) {
      o.version = 0;
    }
    const localisation =
      this.cache?.get(o.lang)?.get(o.key)?.get(o.version) ??
      this.cache?.get(o.lang)?.get(o.key)?.get(0) ??
      this.cache?.get('english')?.get(o.key)?.get(o.version) ??
      this.cache?.get('english')?.get(o.key)?.get(0) ??
      null;

    if (!localisation) {
      await this.load();
    }

    return (
      this.cache?.get(o.lang)?.get(o.key)?.get(o.version) ??
      this.cache?.get(o.lang)?.get(o.key)?.get(0) ??
      this.cache?.get('english')?.get(o.key)?.get(o.version) ??
      this.cache?.get('english')?.get(o.key)?.get(0) ??
      null
    );
  }

  async load(o?): Promise<Localisation[]> {
    const localisations = await super.load(o);
    this.updateCache(localisations);
    return localisations;
  }

  protected async processFile({ path: fullPath }): Promise<Localisation[]> {
    // KR_National_Protection_Alliance_l_en_glish
    // KR_National_Protection_Alliance_l_english
    // KR_l_english
    // tutorial_l_english
    const [, lang] = path.parse(fullPath).name.match(/^.*l_(\S+)$/);
    const out = await fs.promises.readFile(fullPath);
    const data = out.toString();
    return [...data.matchAll(LOCALISATION_REGEX)].map((result) =>
      this.make({
        lang,
        key: result.groups['key'],
        version:
          result.groups['version'] !== undefined
            ? Number(result.groups['version'])
            : 0,
        value: result.groups['value'],
      }),
    );
  }
}
