import { Parser } from '../../src/core';
import { State } from '../../src/history';
import { Province } from '../../src/map';
import { StateCategory } from '../../src/common';

describe('KR Country History (e2e)', () => {
  let kr: Parser;

  beforeAll(async () => {
    kr = await Parser.initialize(hoi4);
  });

  describe('load all states', () => {
    let states: State[];

    beforeAll(async () => {
      states = await kr.history.states.load();
    });

    it("state array shouldn't be empty", () => {
      expect(states.length).toBeTruthy();
    });

    it('every item of the state array should be an instance of state class', () => {
      expect(states.every((state) => state instanceof State)).toBe(true);
    });

    it('every state id should be unique', () => {
      expect(new Set(states.map((state) => state.id)).size).toBe(states.length);
    });
  });

  describe('get a state by id', () => {
    let state: State;

    beforeAll(async () => {
      state = await kr.history.states.get(267);
    });

    it('state id should be matched with requested', () => {
      expect(state.id).toBe(267);
    });

    it('state manpower variable type should be numeric', () => {
      expect(typeof state.manpower === 'number').toBe(true);
    });

    it('victory points should be a map', () => {
      expect(state.history.victoryPoints instanceof Map).toBe(true);
    });

    describe('load a state category', () => {
      let stateCategory: StateCategory;

      beforeAll(async () => {
        stateCategory = await state.getCategory();
      });

      it('category should be an instance of the state category class', () => {
        expect(stateCategory instanceof StateCategory).toBe(true);
      });

      it('category id should be matched with the state category id', () => {
        expect(stateCategory.id).toBe(state['stateCategoryId']);
      });
    });

    describe('load a state provinces', () => {
      let provinces: Province[];

      beforeAll(async () => {
        provinces = await state.getProvinces();
      });

      it("province array shouldn't be empty", () => {
        expect(provinces.length).toBeTruthy();
      });

      it('every province should be an instance of province class', () => {
        expect(
          provinces.every((province) => province instanceof Province),
        ).toBe(true);
      });
    });
  });
});
