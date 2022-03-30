import { Idea } from '../classes/idea.class';
import { GenericManager } from './generic.manager';

export class IdeaManager extends GenericManager {
  async get(id: string) {
    return new Idea();
  }
}
