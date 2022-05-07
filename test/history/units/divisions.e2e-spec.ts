import { Division } from '../../../src';

describe('KR Divisions (e2e)', () => {
  describe('load all divisions', () => {
    let divisions: Division[];

    beforeAll(async () => {
      divisions = await kr.history.divisions.load();
      // console.log('divisions', divisions)
    });

    it('', () => {});
  });
});
