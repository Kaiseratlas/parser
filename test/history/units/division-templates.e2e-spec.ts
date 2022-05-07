import { DivisionTemplate } from '../../../src';

describe('KR Division Templates (e2e)', () => {
  describe('load all division templates', () => {
    let divisionTemplates: DivisionTemplate[];

    beforeAll(async () => {
      divisionTemplates = await kr.history.divisions.templates.load();
    });

    it('', () => {});
  });
});
