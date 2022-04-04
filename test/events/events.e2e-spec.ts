import { Mod } from '../../src/core';
import { Event } from '../../src/events';
import { Localisation } from '../../src/localisation';
import { Sprite } from '../../src/interface';

describe('KR Events (e2e)', () => {
  let kr: Mod;

  beforeAll(() => {
    kr = new Mod(process.env.MOD_PATH);
  });

  describe('load all events', () => {
    let events: Event[];

    beforeAll(async () => {
      events = await kr.events.load();
    });

    it("events array shouldn't be empty", () => {
      expect(events.length).toBeTruthy();
    });

    it('every event should be an instance of the event class', () => {
      expect(events.every((event) => event instanceof Event)).toBe(true);
    });

    it('every event id should be unique', () => {
      expect(new Set(events.map((event) => event.id)).size).toBe(events.length);
    });

    it('every event type value should be one of event type enum', () => {
      expect(
        events.every((event) => Object.values(Event.Type).includes(event.type)),
      ).toBe(true);
    });
  });

  describe('get an event by id', () => {
    let event: Event;
    const eventId = 'afg.0'; // # 5th Anglo-Afghan War

    beforeAll(async () => {
      event = await kr.events.get(eventId);
    });

    it('an event should be an instance of the same class', () => {
      expect(event instanceof Event).toBe(true);
    });

    it('', () => {
      expect(event.id).toBe(eventId);
    });

    // describe('loan an event picture', () => {
    //   let eventPicture: Sprite;
    //
    //   beforeAll(async () => {
    //     eventPicture = await event.getPicture();
    //   });
    //
    //   it('should ', () => {
    //     expect(eventPicture instanceof Sprite).toBe(true);
    //   });
    //
    //   it('should ', () => {
    //     expect(eventPicture.name).toBe(event['picture']);
    //   });
    //
    //   it('should ', async () => {
    //     const buffer = await eventPicture.readFile();
    //     expect(Buffer.isBuffer(buffer)).toBe(true);
    //   });
    // });

    // describe('localisation', () => {
    //   describe('event title', () => {
    //     let eventTitle: Localisation;
    //
    //     beforeAll(async () => {
    //       eventTitle = await event.getTitle();
    //     });
    //
    //     it('should ', () => {
    //       expect(eventTitle instanceof Localisation).toBe(true);
    //     });
    //
    //     it('should ', () => {
    //       expect(eventTitle.key).toBe(event['title']);
    //     });
    //
    //     it('should ', () => {
    //       expect(eventTitle.value).toBe('The 5th Anglo-Afghan War?');
    //     });
    //   });
    //
    //   describe('event description', () => {
    //     let eventDescription: Localisation;
    //
    //     beforeAll(async () => {
    //       eventDescription = await event.getDescription();
    //     });
    //
    //     it('should ', () => {
    //       expect(eventDescription instanceof Localisation).toBe(true);
    //     });
    //
    //     it('should ', () => {
    //       expect(eventDescription.key).toBe(event['description']);
    //     });
    //
    //     it('should ', () => {
    //       expect(
    //         eventDescription.value.includes(
    //           'In the remnants of the Raj to our south',
    //         ),
    //       ).toBe(true);
    //     });
    //   });
    // });
  });
});
