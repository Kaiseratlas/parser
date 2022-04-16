import type Parser, { Game } from '../../src';

declare global {
  // eslint-disable-next-line no-var
  var hoi4: Game;
  var kr: Parser;
}
export {};
