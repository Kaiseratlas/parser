import { Parser } from '../../src/core';
import { Resource } from '../../src/common';

describe('', () => {
  let kr: Parser;

  beforeAll(async () => {
    kr = await Parser.initialize(hoi4);
  });

  describe('load all resources', () => {
    let resources: Resource[];

    beforeAll(async () => {
      resources = await kr.common.resources.load();
      //console.log('resources', resources)
    });

    it("resources array shouldn't be empty", () => {
      expect(resources.length).toBeTruthy();
    });
  });
});
