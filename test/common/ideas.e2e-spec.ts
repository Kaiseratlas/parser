import { Parser } from '../../src/core';
import { Idea } from '../../src/common';

describe('KR Ideas (e2e)', () => {
  let kr: Parser;

  beforeAll(async () => {
    kr = await Parser.initialize(hoi4);
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

    it('', () => {
      expect(new Set(ideas.map((idea) => idea.id)).size).toBe(ideas.length);
    });
  });

  describe('get an idea by id', () => {
    let idea: Idea;

    it('should ', async () => {
      expect(Buffer.isBuffer(await idea.getPicture())).toBe(true)
    });
  });
});
