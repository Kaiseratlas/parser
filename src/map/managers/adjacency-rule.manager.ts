import { convertToArray, GenericManager } from '@shared/';
import { AdjacencyRule } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class AdjacencyRuleManager extends GenericManager<AdjacencyRule> {
  protected readonly wildcards = ['map/adjacency_rules.txt'];

  make(): AdjacencyRule {
    return new AdjacencyRule(this.product);
  }

  protected async processFile({ path }): Promise<AdjacencyRule[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return convertToArray(data['adjacency_rule']).map((data) =>
      plainToClassFromExist(this.make(), data, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      }),
    );
  }
}
