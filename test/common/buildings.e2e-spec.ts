import { Building } from '../../src/common/buildings';
import { Sprite } from '../../src/interface';
import { Localisation } from '../../src/localisation';

describe('', () => {
  describe('load all buildings', () => {
    let buildings: Building[];
    let sprite: Sprite;

    beforeAll(async () => {
      [buildings, sprite] = await Promise.all([
        kr.common.buildings.load(),
        kr.interface.sprites.get('GFX_buildings_strip'),
      ]);
      // console.log('buildings', buildings);
      // console.log('sprite', sprite.noOfFrames);
    });

    it('', () => {
      expect(buildings.length).toBe(sprite.noOfFrames);
    });

    it('', () => {
      expect(buildings.every((building) => building instanceof Building)).toBe(
        true,
      );
    });

    it('', () => {
      expect(new Set(buildings.map((building) => building.id)).size).toBe(
        buildings.length,
      );
    });
  });

  describe('get a building by id', () => {
    let building: Building;
    const buildingId = 'radar_station';

    beforeAll(async () => {
      building = await kr.common.buildings.get(buildingId);
    });

    it('', () => {
      expect(building instanceof Building).toBe(true);
    });

    it('', () => {
      expect(building.id).toBe(buildingId);
    });

    describe('localisation', () => {
      describe('loading a building name', () => {
        let name: Localisation;

        beforeAll(async () => {
          name = await building.getName();
        });

        it('', () => {
          expect(name instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(name.key).toBe(building.id);
        });

        it('', () => {
          expect(name.value).toBe('Radar Station');
        });
      });

      describe('loading a building description', () => {
        let description: Localisation;

        beforeAll(async () => {
          description = await building.getDescription();
        });

        it('', () => {
          expect(description instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(description.key.includes(building.id)).toBe(true);
        });

        it('', () => {
          expect(
            description.value.includes('Radar allows you to gain intel'),
          ).toBe(true);
        });
      });

      describe('loading a building plural', () => {
        let plural: Localisation;

        beforeAll(async () => {
          plural = await building.getPlural();
        });

        it('', () => {
          expect(plural instanceof Localisation).toBe(true);
        });

        it('', () => {
          expect(plural.key.includes(building.id)).toBe(true);
        });

        it('', () => {
          expect(plural.value).toBe('Radar Stations');
        });
      });
    });
  });
});
