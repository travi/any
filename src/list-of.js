import _ from 'lodash';
import {integer, DEFAULT_SIZE_RANGE} from './base';

export default function listOf(factory, options = {}) {
  const listSize = options.size || integer(Object.assign({}, DEFAULT_SIZE_RANGE, options));

  if (options.uniqueOn) {
    const uniqueValues = {};

    while (Object.keys(uniqueValues).length < listSize) {
      const item = factory();
      uniqueValues[item[options.uniqueOn]] = item;
    }

    return _.values(uniqueValues);
  }

  const list = [];

  for (let i = 0; i < listSize; i += 1) {
    list.push(factory());
  }

  return list;
}
