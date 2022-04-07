import { Ability } from '../../src/common';
import { Localisation } from '../../src/localisation';

describe('KR Abilities (e2e)', () => {
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

  describe('get ability by id', () => {
    let ability: Ability;
    const abilityId = 'staff_office_plan';

    beforeAll(async () => {
      ability = await kr.common.abilities.get(abilityId);
    });

    it('', () => {
      expect(ability instanceof Ability).toBe(true);
    });

    it('', () => {
      expect(ability.id).toBe(abilityId);
    });

    describe('localisation', () => {
      describe('load a name', () => {
        let name: Localisation;

        beforeAll(async () => {
          name = await ability.getName();
        });

        it('', () => {
          expect(name instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(name.key).toBe(ability['name']);
        });

        it('', () => {
          expect(name.value).toBe('Staff Office Plan');
        });
      });

      describe('load a description', () => {
        let description: Localisation;

        beforeAll(async () => {
          description = await ability.getDescription();
        });

        it('', () => {
          expect(description instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(description.key).toBe(ability['description']);
        });

        it('', () => {
          expect(description.value.includes('planning speed')).toBe(true);
        });
      });
    });
  });
});
