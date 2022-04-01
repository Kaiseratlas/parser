import { GenericManager } from '@shared/';
import { OpinionModifier } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class OpinionModifierManager extends GenericManager<OpinionModifier> {
  protected readonly wildcards = ['common/opinion_modifiers/**/*.txt'];

  async get(id: OpinionModifier['id']) {
    const opinionModifiers = await this.load();
    return opinionModifiers.find(
      (opinionModifier) => opinionModifier.id === id,
    );
  }

  protected async processFile({ path }): Promise<OpinionModifier[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries<Record<string, unknown>>(data['opinion_modifiers'])
      .map(([id, data]) => [
        id,
        Array.isArray(data) ? data[data.length - 1] : data,
      ])
      .map(([id, data]) => {
        return plainToClassFromExist(
          new OpinionModifier(this.product, id),
          data,
          {
            excludeExtraneousValues: true,
            exposeDefaultValues: true,
          },
        );
      });
  }
}
