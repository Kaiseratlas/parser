import { Mod } from '../src/classes/mod.class';

describe('KR Autonomous States (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  it('load all autonomous states', async () => {
    await kr.common.AS.load();
  });

  it('get an autonomous state by id', async () => {
    const AS = await kr.common.AS.get('kr_colonial_government');
    expect(AS.id).toBe('kr_colonial_government');
  });
});
