import { Mod } from '../../src/shared/classes/mod.class';

describe('KR Abilities (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  it('load all abilities', async () => {
    await kr.common.abilities.load();
  });

  it('get ability by id', async () => {
    const ability = await kr.common.abilities.get('staff_office_plan');
    expect(ability.id).toBe('staff_office_plan');
  });
});
