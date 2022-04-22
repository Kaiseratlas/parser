import { convertToArray, GenericManager } from '@shared/';
import { GameRule } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class GameRuleManager extends GenericManager<GameRule> {
  protected readonly wildcards = ['common/game_rules/**/*.txt'];

  make(group: GameRule['group'], id: GameRule['id']): GameRule {
    return new GameRule(this.product, group, id);
  }

  protected async processFile({ path }): Promise<GameRule[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return Object.entries(data).map(([id, data]) => {
      const group = new GameRule.Group(this.product, data['group']);
      const gameRule = plainToClassFromExist(this.make(group, id), data, {
        exposeDefaultValues: true,
        excludeExtraneousValues: true,
      });

      const options = convertToArray(data['option']).map((data) =>
        plainToClassFromExist(new GameRule.Option(this.product), data, {
          exposeDefaultValues: true,
          excludeExtraneousValues: true,
        }),
      );

      gameRule.addOptions(...options);

      return gameRule;
    });
  }
}
