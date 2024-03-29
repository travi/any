import Chance from 'chance';
import MersenneTwister from 'mersenne-twister';
import debugLibrary from 'debug';

const debug = debugLibrary('any');

const generator = new MersenneTwister();
// Multiply the random seed to match chance.js
const seed = process.env.ANY_SEED || generator.random() * (10 ** 13);
debug(`randomness seed: ${seed}`);

function isPrimitive(value) {
  return (value !== Object(value));
}

const chance = new Chance(seed);

export const integer = options => chance.natural(!isPrimitive(options) ? options : undefined);
export const float = options => chance.floating(!isPrimitive(options) ? options : undefined);
export const string = options => chance.string(!isPrimitive(options) ? options : undefined);
export const sentence = options => chance.sentence(!isPrimitive(options) ? options : undefined);
export const paragraph = options => chance.paragraph(!isPrimitive(options) ? options : undefined);
export const url = options => chance.url(!isPrimitive(options) ? options : undefined);
export const boolean = options => chance.bool(!isPrimitive(options) ? options : undefined);
export const email = options => chance.email(!isPrimitive(options) ? options : undefined);
export const date = options => chance.date({string: true, ...options});
export const fromList = list => chance.pickone(list);
export const subList = (list, {size}) => chance.pickset(list, size);

export function word(options = {}) {
  return options.length ? chance.word(options) : chance.word({
    syllables: 3,
    ...!isPrimitive(options) ? options : undefined
  });
}

export const DEFAULT_SIZE_RANGE = {max: 20, min: 1};
