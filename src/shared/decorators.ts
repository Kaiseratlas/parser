import { Transform } from 'class-transformer';
import { convertToArray } from './utils';

export function TransformToArray() {
  return Transform(({ value }) => convertToArray(value));
}

export function TransformToOne() {
  return Transform(({ value }) =>
    Array.isArray(value) ? [...value].pop() : value,
  );
}
