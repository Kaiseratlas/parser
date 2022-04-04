import { Mod } from '../../src/core';
import { Ability } from '../../src/common';

describe('KR Abilities (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all abilities', () => {
    let abilities: Ability[];

    beforeAll(async () => {
      abilities = await kr.common.abilities.load();
    });

    it('', () => {
      expect(abilities.length).toBeTruthy();
    });

    it('', () => {
      expect(abilities.every((ability) => ability instanceof Ability)).toBe(
        true,
      );
    });

    it('', () => {
      expect(new Set(abilities.map((ability) => ability.id)).size).toBe(
        abilities.length,
      );
    });
  });

  it('get ability by id', async () => {
    const ability = await kr.common.abilities.get('staff_office_plan');
    expect(ability.id).toBe('staff_office_plan');
  });
});
