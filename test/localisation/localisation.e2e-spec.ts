import { Localisation, LocalisationManager } from '../../src/localisation';

describe('', () => {
  describe('load all sprites', () => {
    let localisations: Localisation[];
    let localisation: Localisation;
    let spy;

    beforeAll(async () => {
      spy = jest.spyOn(kr.i18n, 'load');
      localisations = await kr.i18n.load();
      localisation = await kr.i18n.t({
        key: 'ACTIVE_ATTACHES_EFFECT',
        lang: 'english',
        version: 0,
      });

      //console.log('localisations', localisations);
      // console.log('localisation', localisation);
    });

    it('', () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
