import {boolean, date, email, float, integer, paragraph, sentence, string, url, word} from './base';
import listOf from './list-of';
import simpleObject from './simple-object';

function objectWithKeys(keys, options = {}) {
  return keys
    .map(key => (options.factory ? [key, options.factory(key)] : [key, string()]))
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
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
