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
        key: 'CAN',
        lang: 'english',
        version: 0,
      });

      const x = await kr.common.countries.get('CAN');


      //console.log('localisations', localisations);
      console.log('localisation', await x.getCurrentName());
    });

    it('', () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
