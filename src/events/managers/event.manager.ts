import { convertToArray, GenericManager } from '@shared/';
import { Event } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';
import { EventType } from '../enums';
import { tryToFixFile } from '@shared/';

export class EventManager extends GenericManager<Event> {
  protected readonly wildcards = ['events/**/*.txt'];

  make(type: EventType) {
    return new Event(this.product, type);
  }

  protected async processFile({ path }): Promise<Event[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    let data: unknown;
    try {
      data = parser.parseText(out);
    } catch (e) {
      data = parser.parseText(tryToFixFile(out));
    }

    return Object.values(EventType).flatMap((type) =>
      convertToArray(data[type]).flatMap((data) =>
        plainToClassFromExist(this.make(type), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        }),
      ),
    );
  }
}
