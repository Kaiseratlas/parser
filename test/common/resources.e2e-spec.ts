import { Resource } from '../../src/common';
import { Localisation } from '../../src/localisation';

describe('HOI4 Resources (e2e)', () => {
  describe('load all resources', () => {
    let resources: Resource[];

    beforeAll(async () => {
      resources = await kr.common.resources.load();
    });

    it("resources array shouldn't be empty", () => {
      expect(resources.length).toBeTruthy();
    });

    it('every resource array item should  be an instance of the resource class', () => {
      expect(resources.every((resource) => resource instanceof Resource)).toBe(
        true,
      );
    });

    it('every resource should have a unique id', () => {
      expect(new Set(resources.map((resource) => resource.id)).size).toBe(
        resources.length,
      );
    });
  });

  describe('get a resource by id', () => {
    let resource: Resource;
    const resourceId = 'steel';

    beforeAll(async () => {
      resource = await kr.common.resources.get(resourceId);
    });

    it('resource should be an instance of the resource class', () => {
      expect(resource instanceof Resource).toBe(true);
    });

    it('resource id should be matched with expected', () => {
      expect(resource.id).toBe(resourceId);
    });

    it('CIC value type should be numeric', () => {
      expect(typeof resource.CIC === 'number').toBe(true);
    });

    it('amount of this resource a single convoy carries should be numeric', () => {
      expect(typeof resource.convoys === 'number').toBe(true);
    });

    describe('localisation', () => {
      describe('loading a resource name', () => {
        let name: Localisation;

        beforeAll(async () => {
          name = await resource.getName();
        });

        it('', () => {
          expect(name instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(name.key.includes(resourceId.toUpperCase())).toBe(true);
        });

        it('', () => {
          expect(name.value).toBe('Steel');
        });
      });

      describe('loading a resource description', () => {
        let description: Localisation;

        beforeAll(async () => {
          description = await resource.getDescription();
        });

        it('', () => {
          expect(description instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(description.key.includes(resourceId)).toBe(true);
        });

        it('', () => {
          expect(description.value.includes('Steel is the primary metal')).toBe(
            true,
          );
        });
      });
    });
  });
});
