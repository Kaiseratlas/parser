import 'dotenv/config';
import { Game } from '../src/core';

jest.setTimeout(30000);

global.hoi4 = Game.fromPath(process.env.GAME_PATH);
