import {string, boolean, date, email, float, integer, paragraph, sentence, url, word, DEFAULT_SIZE_RANGE} from './base';
import listOf from './list-of';

function simpleObject() {
  const object = {};
  const size = integer(DEFAULT_SIZE_RANGE);

  for (let i = 0; i < size; i += 1) {
    object[word()] = string();
  }

  return object;
}

function objectWithKeys(keys, options = {}) {
  const object = {};

  keys.forEach(key => {
    if (options.factory) {
      object[key] = options.factory(key);
    } else {
      object[key] = string();
    }
  });

  return object;
}

function fromList(list) {
  return list[integer({min: 0, max: list.length - 1})];
}

export default {
  string,
  word,
  sentence,
  paragraph,
  integer,
  float,
  boolean,
  url,
  email,
  date,
  simpleObject,
  objectWithKeys,
  listOf,
  fromList
};
