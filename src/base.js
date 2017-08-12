import Chance from 'chance';
import MersenneTwister from 'mersenne-twister';

const debug = require('debug')('any');

const generator = new MersenneTwister();
// Multiply the random seed to match chance.js
const seed = process.env.ANY_SEED || generator.random() * (10 ** 13);
debug(`randomness seed: ${seed}`);

const chance = new Chance(seed);

export const integer = options => chance.natural(options);
export const float = options => chance.floating(options);
export const string = options => chance.string(options);
export const sentence = options => chance.sentence(options);
export const paragraph = options => chance.paragraph(options);
export const url = options => chance.url(options);
export const boolean = options => chance.bool(options);
export const email = options => chance.email(options);
export const date = () => chance.date({string: true});

export function word(options = {}) {
  return options.length ? chance.word(options) : chance.word({syllables: 3, ...options});
}

export const DEFAULT_SIZE_RANGE = {max: 20, min: 1};
