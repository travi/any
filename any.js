import _ from 'lodash';
import Chance from 'chance';
import MersenneTwister from 'mersenne-twister';

const debug = require('debug')('any');

const generator = new MersenneTwister();
// Multiply the random seed to match chance.js
const seed = process.env.ANY_SEED || generator.random() * (10 ** 13);
debug(`randomness seed: ${seed}`);

const chance = new Chance(seed);

const DEFAULT_SIZE_RANGE = {max: 20, min: 1};

const integer = options => chance.natural(options);
const float = options => chance.floating(options);
const string = options => chance.string(options);
const word = options => chance.word(options);
const sentence = options => chance.sentence(options);
const paragraph = options => chance.paragraph(options);
const url = options => chance.url(options);
const boolean = options => chance.bool(options);
const email = options => chance.email(options);
const date = () => chance.date({string: true});

function simpleObject() {
  const object = {};
  const size = integer(DEFAULT_SIZE_RANGE);

  for (let i = 0; i < size; i += 1) {
    object[word({syllables: 3})] = string();
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
