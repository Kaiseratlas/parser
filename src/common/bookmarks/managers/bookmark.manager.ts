import { convertToArray, GenericManager } from '@shared/';
import { Bookmark } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class BookmarkManager extends GenericManager<Bookmark> {
  protected readonly wildcards = ['common/bookmarks/**/*.txt'];

  make(): Bookmark {
    return new Bookmark(this.product);
  }

  protected async processFile({ path }): Promise<Bookmark[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return convertToArray(data['bookmarks'])
      .map((data) =>
        convertToArray(data['bookmark']).map((data) => {
          const bookmark = plainToClassFromExist(this.make(), data, {
            exposeDefaultValues: true,
            excludeExtraneousValues: true,
          });
          const countries = Object.entries(data)
            .filter(([key]) => key.length === 3)
            .map(([countryTag, data]) =>
              plainToClassFromExist(
                new Bookmark.Country(this.product, bookmark, countryTag),
                data,
                {
                  exposeDefaultValues: true,
                  excludeExtraneousValues: true,
                },
              ),
            );
          bookmark.addCountry(...countries);

          return bookmark;
        }),
      )
      .flat(1);
  }
}
