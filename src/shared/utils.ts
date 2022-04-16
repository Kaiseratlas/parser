import { default as libDebug } from 'debug';

export function convertToArray(out: unknown | unknown[]): unknown[] {
  if (!out) {
    return [];
  }

  if (Array.isArray(out)) {
    return out;
  }

  return [out];
}

export function tryToFixFile(out: Buffer) {
  return out
    .toString()
    .replace(/\[RULING_PARTY_TAG]/gi, '"[RULING_PARTY_TAG]"')
    .replace(/\[ALLY]/gi, '"[ALLY]"')
    .replace(/\[ENEMY]/gi, '"[ENEMY]"')
    .replace(/\[time_off_var]/gi, '"[time_off_var]"');
}

export const debug = libDebug('parser');
