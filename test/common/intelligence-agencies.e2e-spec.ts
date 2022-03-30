import { Mod } from '../../src/shared/classes/mod.class';

describe('', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all intelligence agencies', () => {
    let agencies: any[];

    beforeAll(async () => {
      agencies = await kr.common.IA.load();
      console.log('agencies', agencies);
    });

    it('every agency has an array of names', async () => {
      const checked = agencies.every((agency) => Array.isArray(agency.names));
      expect(checked).toBe(true);
    });
  });
});
