import { Idea } from '../classes';
import { GenericManager } from '@shared/';

export class IdeaManager extends GenericManager<Idea> {
  async get(id: string) {
    return new Idea();
  }
}
