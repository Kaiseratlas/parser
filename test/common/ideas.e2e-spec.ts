import { Mod } from '../../src/core';
import { Idea } from '../../src/common';

describe('KR Ideas (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all ideas', () => {
    let ideas: Idea[];

    beforeAll(async () => {
      ideas = await kr.common.ideas.load();
    });

    it('', () => {
      expect(ideas.length).toBeTruthy();
    });

    it('every item should be an instance of the idea class', () => {
      expect(ideas.every((idea) => idea instanceof Idea)).toBe(true);
    });

    // TODO: !
    // it('', () => {
    //   expect(new Set(ideas.map((idea) => idea.id)).size).toBe(ideas.length);
    // });
  });

  describe('get an idea by id', () => {
    let idea: Idea;
  });
});
