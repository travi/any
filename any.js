import _ from 'lodash';
import Chance from 'chance';

const chance = new Chance();

const DEFAULT_SIZE_RANGE = {max: 20, min: 1};

const integer = options => chance.natural(options);
const float = options => chance.floating(options);
const string = options => chance.string(options);
const word = () => chance.word();
const url = options => chance.url(options);
const boolean = () => chance.bool();
const email = () => chance.email();
const date = () => chance.date({string: true});

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
      object[key] = options.factory();
    } else {
      object[key] = string();
    }
  });

  return object;
}

function listOf(factory, options = {}) {
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

function fromList(list) {
  return list[integer({min: 0, max: list.length - 1})];
}

export default {
  string,
  word,
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
