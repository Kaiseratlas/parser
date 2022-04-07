import { Adjacency } from '../../../src/map';

describe('KR Adjacencies (e2e)', () => {
  describe('load all adjacencies', () => {
    let adjacencies: Adjacency[];

    beforeAll(async () => {
      adjacencies = await kr.map.adjacencies.load();
    });

    it("adjacencies array shouldn't be empty", () => {
      expect(adjacencies.length).toBeTruthy();
    });

    it('every item should be an instance of the adjacency class', () => {
      expect(
        adjacencies.every((adjacency) => adjacency instanceof Adjacency),
      ).toBe(true);
    });

    it('', () => {
      expect(
        adjacencies.every(
          (adjacency) =>
            typeof adjacency.from === 'number' && !isNaN(adjacency.from),
        ),
      ).toBe(true);
    });

    it('', () => {
      expect(
        adjacencies.every(
          (adjacency) =>
            typeof adjacency.to === 'number' && !isNaN(adjacency.from),
        ),
      ).toBe(true);
    });
  });

  // describe('get a adjacency rule by id', () => {
  //   let adjacency: AdjacencyRule;
  //   const adjacencyRuleId = 'SUEZ_CANAL';
  //
  //   beforeAll(async () => {
  //     adjacencyRule = await kr.map.adjacencies.rules.get(adjacencyRuleId);
  //   });
  //
  //   it('adjacency rule should be an instance of the same class', () => {
  //     expect(adjacencyRule instanceof AdjacencyRule).toBe(true);
  //   });
  //
  //   it('adjacency rule id should be matched with expected', () => {
  //     expect(adjacencyRule.id).toBe(adjacencyRuleId);
  //   });
  //
  //   describe('localisation', () => {
  //     describe('loading a adjacency rule name', () => {
  //       let name: Localisation;
  //
  //       beforeAll(async () => {
  //         name = await adjacencyRule.getName();
  //       });
  //
  //       it('an adjacency rule name should be an instance of the localisation class', () => {
  //         expect(name instanceof Localisation).toBe(true);
  //       });
  //
  //       it('an adjacency rule name localisation key should be matched with continent name', () => {
  //         expect(name.key).toBe(adjacencyRule.id);
  //       });
  //
  //       it('an adjacency rule name should be matched with expected', () => {
  //         expect(name.value).toBe('Süveys Kanalı');
  //       });
  //     });
  //   });
  // });
});
