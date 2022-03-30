import { Expose, plainToInstance, Transform } from 'class-transformer';
import { Focus } from './focus.class';

type FocusMap = Map<Focus['id'], Focus>;

export class FocusTree {
  @Expose()
  readonly id: string;
  @Expose({ name: 'focus' })
  @Transform(({ value }) =>
    plainToInstance(Focus, value, {
      excludeExtraneousValues: true,
    }),
  )
  @Transform(({ value: focuses }) => {
    const focusMap = new Map();
    // console.log(focuses);
    focuses.forEach((focus) => focusMap.set(focus.id, focus));
    return focusMap;
  })
  readonly focuses: FocusMap;

  get(id: Focus['id']): Focus | null {
    return this.focuses.get(id) ?? null;
  }
}
