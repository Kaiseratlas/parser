import { TechnologyCategory, TechnologySharingGroup } from '../../../src/common';
import { Localisation } from '../../../src/localisation';

describe('KR Technology Sharing Groups (e2e)', () => {
  describe('load all technology sharing groups', () => {
    let technologySharingGroups: TechnologySharingGroup[];

    beforeAll(async () => {
      technologySharingGroups =
        await kr.common.technologies.sharingGroups.load();
    });

    it('', () => {
      expect(technologySharingGroups.length).toBeTruthy();
    });

    it('', () => {
      expect(
        technologySharingGroups.every(
          (technologySharingGroup) =>
            technologySharingGroup instanceof TechnologySharingGroup,
        ),
      ).toBe(true);
    });

    it('', () => {
      expect(
        new Set(
          technologySharingGroups.map(
            (technologySharingGroup) => technologySharingGroup.id,
          ),
        ).size,
      ).toBe(technologySharingGroups.length);
    });
  });

  describe('get a technology sharing group category by id', () => {
    let technologySharingGroup: TechnologySharingGroup;
    const technologySharingGroupId = 'entente_research';

    beforeAll(async () => {
      technologySharingGroup = await kr.common.technologies.sharingGroups.get(
        technologySharingGroupId,
      );
    });

    it('', () => {
      expect(technologySharingGroup instanceof TechnologySharingGroup).toBe(
        true,
      );
    });

    it('', () => {
      expect(technologySharingGroup.id).toBe(technologySharingGroupId);
    });

    describe('localisation', () => {
      describe('load a name', () => {
        let name: Localisation;

        beforeAll(async () => {
          name = await technologySharingGroup.getName();
        });

        it('', () => {
          expect(name instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(name.key).toBe(technologySharingGroup['name']);
        });

        it('', () => {
          expect(name.value).toBe(
            'The Imperial Scientific and Academic Council',
          );
        });
      });

      describe('load a description', () => {
        let description: Localisation;

        beforeAll(async () => {
          description = await technologySharingGroup.getDescription();
        });

        it('', () => {
          expect(description instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(description.key).toBe(technologySharingGroup['description']);
        });

        it('', () => {
          expect(
            description.value.includes(
              'The Imperial Scientific and Academic Council',
            ),
          ).toBe(true);
        });
      });
    });
  });
});
