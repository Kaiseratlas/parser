import { GenericManager } from '@shared/';
import { Event } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { x } from '../../interface';
import { plainToClassFromExist } from 'class-transformer';
import { EventType } from '../enums';

function tryToFixFile(out: Buffer) {
  return out
    .toString()
    .replace(/\[RULING_PARTY_TAG]/gi, '"[RULING_PARTY_TAG]"')
    .replace(/\[ALLY]/gi, '"[ALLY]"')
    .replace(/\[ENEMY]/gi, '"[ENEMY]"')
    .replace(/\[time_off_var]/gi, '"[time_off_var]"');
}

export class EventManager extends GenericManager<Event> {
  protected readonly wildcards = ['events/**/*.txt'];
  //protected readonly wildcards = ['events/Venice.txt'];

  make(type: EventType) {
    return new Event(this.product, type);
  }

  async get(id: Event['id']) {
    const events = await this.load();
    return events.find((event) => event.id === id);
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
      x(data[type]).flatMap((data) =>
        plainToClassFromExist(this.make(type), data, {
          excludeExtraneousValues: true,
          exposeDefaultValues: true,
        }),
      ),
    );
  }
}
