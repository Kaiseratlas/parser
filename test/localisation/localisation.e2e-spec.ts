import { Localisation } from '../../src/localisation';

describe('', () => {
  describe('load all sprites', () => {
    let localisations: Localisation[];
    let localisation: Localisation;

    beforeAll(async () => {
      // localisations = await kr.localisation.load();
      localisation = await kr.localisation.get({
        key: 'ACTIVE_ATTACHES_EFFECT',
        //lang: 'english',
        // version: 0,
      });

      //console.log('localisations', localisations);
      console.log('localisation', localisation);
    });

    it('', () => {});
  });
});
