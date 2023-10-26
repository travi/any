import _ from 'lodash';

import {integer, DEFAULT_SIZE_RANGE} from './base.js';

export default function listOf(factory, options = {}) {
  const listSize = options.size || integer({...DEFAULT_SIZE_RANGE, ...options});

  if (options.uniqueOn) {
    const uniqueValues = {};

    while (Object.keys(uniqueValues).length < listSize) {
      const item = factory(Object.keys(uniqueValues).length);
      uniqueValues[item[options.uniqueOn]] = item;
    }

    return _.values(uniqueValues);
  }

  const list = [];

  for (let i = 0; i < listSize; i += 1) {
    list.push(factory(i));
  }

  return list;
}
