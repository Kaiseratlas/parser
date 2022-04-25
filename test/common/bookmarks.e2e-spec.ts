import { Bookmark } from '../../src';

describe('', () => {
  describe('load all bookmarks', () => {
    let bookmarks: Bookmark[];

    beforeAll(async () => {
      bookmarks = await kr.common.bookmarks.load();
      //console.log('bookmarks', bookmarks)
    });

    it('', () => {});
  });
});
