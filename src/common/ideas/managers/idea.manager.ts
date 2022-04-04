import { Idea } from '../classes';
import { GenericManager } from '@shared/';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class IdeaManager extends GenericManager<Idea> {
  protected readonly wildcards = ['common/ideas/**/*.txt'];

  make(...args): Idea {
    return undefined;
  }

  protected async processFile({ path }): Promise<Idea[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['ideas']).flatMap(
      ([slotId, slotData]) => {
        const slot = new Idea.Slot(this.product, slotId);
        return Object.entries(slotData)
          .filter(([, value]) => typeof value === 'object')
          .map(([ideaId, ideaData]) =>
            plainToClassFromExist(
              new Idea(this.product, ideaId, slot),
              ideaData,
              {
                excludeExtraneousValues: true,
                exposeDefaultValues: true,
              },
            ),
          );
      },
    );
  }
}
