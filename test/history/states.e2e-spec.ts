import { Country, State, StateCategory, Province } from '../../src';

describe('KR Country History (e2e)', () => {
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
    const kabulId = 267;

    beforeAll(async () => {
      state = await kr.history.states.get(kabulId);
    });

    it('should be an instance of the state class', () => {
      expect(state instanceof State).toBe(true);
    });

    it('state id should be matched with requested', () => {
      expect(state.id).toBe(kabulId);
    });

    it('state manpower variable type should be numeric', () => {
      expect(typeof state.manpower === 'number').toBe(true);
    });

    it('victory points should be a map', () => {
      expect(state.history.victoryPoints instanceof Map).toBe(true);
    });

    describe('state history', () => {
      let afg: Country;

      beforeAll(async () => {
        afg = await kr.common.countries.get('AFG');
      });

      describe('load an country owner', () => {
        let country: Country;

        beforeAll(async () => {
          country = await state.history.getOwner();
        });

        it('country owner should be an instance of the country class', () => {
          expect(country instanceof Country).toBe(true);
        });

        it('country owner tag should be matched with the owner tag', () => {
          expect(country.tag).toBe(state.history['owner']);
        });
      });

      describe('load an country controller', () => {
        let country: Country;

        beforeAll(async () => {
          country = await state.history.getController();
        });

        it('country controller should be an instance of the country class', () => {
          expect(country instanceof Country).toBe(true);
        });

        it('country tag should be matched with the state controller or owner tags', () => {
          expect(
            country.tag === state.history['controller'] ||
              country.tag === state.history['owner'],
          ).toBe(true);
        });
      });

      it('should be owner by Afghanistan', () => {
        expect(state.history.isOwnedBy(afg)).toBe(true);
      });

      it('should be controlled by Afghanistan', () => {
        expect(state.history.isControlledBy(afg)).toBe(true);
      });

      it('should be a core state of Afghanistan', () => {
        expect(state.history.isCoreOf(afg)).toBe(true);
      });

      it("shouldn't have a claim by Canada", () => {
        expect(state.history.hasClaimFrom('CAN')).toBe(false);
      });
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
