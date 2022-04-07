import { Technology, TechnologyCategory } from '../../../src/common';
import { Localisation } from '../../../src/localisation';

describe('KR Technologies (e2e)', () => {
  describe('load all technologies', () => {
    let technologies: Technology[];

    beforeAll(async () => {
      technologies = await kr.common.technologies.load();
    });

    it('', () => {
      expect(technologies.length).toBeTruthy();
    });

    it('', () => {
      expect(
        technologies.every((technology) => technology instanceof Technology),
      ).toBe(true);
    });

    it('', () => {
      expect(
        new Set(technologies.map((technology) => technology.id)).size,
      ).toBe(technologies.length);
    });
  });

  describe('get a technology by id', () => {
    let technology: Technology;
    const technologyId = 'improved_machine_tools';

    beforeAll(async () => {
      technology = await kr.common.technologies.get(technologyId);
    });

    it('', () => {
      expect(technology instanceof Technology).toBe(true);
    });

    it('', () => {
      expect(technology.id).toBe(technologyId);
    });

    describe('', () => {
      let categories: TechnologyCategory[];

      beforeAll(async () => {
        categories = await technology.getCategories();
      });

      it('', () => {
        expect(categories.length).toBeTruthy();
      });

      it('', () => {
        expect(
          categories.every(
            (category) => category instanceof TechnologyCategory,
          ),
        ).toBe(true);
      });

      it('', () => {
        expect(new Set(categories.map((category) => category.id)).size).toBe(
          categories.length,
        );
      });
    });

    describe('localisation', () => {
      describe('load a name', () => {
        let name: Localisation;

        beforeAll(async () => {
          name = await technology.getName();
        });

        it('', () => {
          expect(name instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(name.key).toBe(technology.id);
        });

        it('', () => {
          expect(name.value).toBe('Improved Machine Tools');
        });
      });

      describe('load a description', () => {
        let description: Localisation;

        beforeAll(async () => {
          description = await technology.getDescription();
        });

        it('', () => {
          expect(description instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(description.key.includes(technology.id)).toBe(true);
        });

        it('', () => {
          expect(
            description.value.includes(
              'Turret lathes are proving indispensable',
            ),
          ).toBe(true);
        });
      });
    });
  });
});
