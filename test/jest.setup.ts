import 'dotenv/config';
import { Game } from '../src';
import { Parser } from '../src/core';

jest.setTimeout(60 * 1000);

beforeAll(async () => {
  const hoi4 = Game.fromPath(process.env.GAME_PATH, {
    modPath: process.env.MOD_PATH,
  });
  global.hoi4 = hoi4;
  global.kr = await Parser.initialize(hoi4);
});
