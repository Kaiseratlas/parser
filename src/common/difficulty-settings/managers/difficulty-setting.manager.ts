import { convertToArray, GenericManager } from '@shared/';
import { DifficultySetting } from '../classes';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClassFromExist } from 'class-transformer';

export class DifficultySettingManager extends GenericManager<DifficultySetting> {
  protected readonly wildcards = ['common/difficulty_settings/**/*.txt'];

  make(): DifficultySetting {
    return new DifficultySetting(this.product);
  }

  protected updateCache(difficultySettings: DifficultySetting[]) {
    difficultySettings.forEach((difficultySetting) =>
      this.cache.set(difficultySetting.key, difficultySetting),
    );
  }

  protected async processFile({ path }): Promise<DifficultySetting[]> {
    const out = await fs.promises.readFile(path);
    const parser = await Jomini.initialize();
    const data = parser.parseText(out);
    return convertToArray(data['difficulty_settings'])
      .map((data) =>
        convertToArray(data['difficulty_setting']).map((data) =>
          plainToClassFromExist(this.make(), data, {
            excludeExtraneousValues: true,
            exposeDefaultValues: true,
          }),
        ),
      )
      .flat(1);
  }
}
