import 'dotenv/config';
import { Game } from '../src';
import { Parser } from '../src/core';

jest.setTimeout(60 * 1000);

beforeAll(async () => {
  const hoi4 = Game.fromPath(process.env.GAME_PATH);
  global.kr = await Parser.initialize(hoi4);
});
