import { Localisation } from '../../../src/localisation';
import { AdjacencyRule } from '../../../src/map';

describe('KR Adjacency Rules (e2e)', () => {
  describe('load all adjacency rules', () => {
    let adjacencyRules: AdjacencyRule[];

    beforeAll(async () => {
      adjacencyRules = await kr.map.adjacencies.rules.load();
    });

    it("adjacency rules array shouldn't be empty", () => {
      expect(adjacencyRules.length).toBeTruthy();
    });

    it('every item should be an instance of the adjacency rule class', () => {
      expect(
        adjacencyRules.every(
          (adjacencyRule) => adjacencyRule instanceof AdjacencyRule,
        ),
      ).toBe(true);
    });

    it('every adjacency rule id should be unique', () => {
      expect(
        new Set(adjacencyRules.map((adjacencyRule) => adjacencyRule.id)).size,
      ).toBe(adjacencyRules.length);
    });
  });

  describe('get a adjacency rule by id', () => {
    let adjacencyRule: AdjacencyRule;
    const adjacencyRuleId = 'SUEZ_CANAL';

    beforeAll(async () => {
      adjacencyRule = await kr.map.adjacencies.rules.get(adjacencyRuleId);
    });

    it('adjacency rule should be an instance of the same class', () => {
      expect(adjacencyRule instanceof AdjacencyRule).toBe(true);
    });

    it('adjacency rule id should be matched with expected', () => {
      expect(adjacencyRule.id).toBe(adjacencyRuleId);
    });

    describe('localisation', () => {
      describe('loading a adjacency rule name', () => {
        let name: Localisation;

        beforeAll(async () => {
          name = await adjacencyRule.getName();
        });

        it('an adjacency rule name should be an instance of the localisation class', () => {
          expect(name instanceof Localisation).toBe(true);
        });

        it('an adjacency rule name localisation key should be matched with continent name', () => {
          expect(name.key).toBe(adjacencyRule.id);
        });

        it('an adjacency rule name should be matched with expected', () => {
          expect(name.value).toBe('Süveys Kanalı');
        });
      });
    });
  });
});
