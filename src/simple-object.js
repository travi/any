import {DEFAULT_SIZE_RANGE, integer, string, word} from './base';

export default function () {
  const object = {};
  const size = integer(DEFAULT_SIZE_RANGE);

  for (let i = 0; i < size; i += 1) {
    object[word()] = string();
  }

  return object;
}
