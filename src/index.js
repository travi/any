import {boolean, date, email, float, integer, paragraph, sentence, string, url, word} from './base';
import listOf from './list-of';
import simpleObject from './simple-object';
import fromList from './from-list';

function objectWithKeys(keys, options = {}) {
  return keys
    .map(key => (options.factory ? [key, options.factory(key)] : [key, string()]))
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
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
