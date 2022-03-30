import { Mod } from '../src/classes/mod.class';

describe('KR Countries (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  it('should be loaded successfully', async () => {
    //const counties = await kr.history.countries.load();
  });

  it('should ', async () => {
    //const austria = await kr.history.countries.get('AUS');
  });
});
