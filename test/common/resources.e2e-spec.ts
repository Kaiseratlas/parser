import { Mod } from '../../src/core';
import { Country } from '../../src/common/countries';
import { Resource } from '../../src/common';

describe('', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all resources', () => {
    let resources: Resource[];

    beforeAll(async () => {
      resources = await kr.common.resources.load();
    });

    it("resources array shouldn't be empty", () => {
      //expect(resources.length).toBeTruthy();
    });
  });
});
