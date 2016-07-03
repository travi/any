import Chance from 'chance';
const chance = new Chance();

const DEFAULT_SIZE_RANGE = {max: 20, min: 1};

export const integer = (options) => chance.natural(options);
export const string = (options) => chance.string(options);
export const word = () => chance.word();
export const url = (options) => chance.url(options);
export const boolean = () => chance.bool();
export const email = () => chance.email();
export const date = () => chance.date({string: true});

export function simpleObject() {
    const
        object = {},
        size = integer(DEFAULT_SIZE_RANGE);

    for (let i = 0; i < size; i += 1) {
        object[word()] = string();
    }

    return object;
}

export function objectWithKeys(keys, options = {}) {
    const object = {};

    keys.forEach((key) => {
        if (options.factory) {
            object[key] = options.factory();
        } else {
            object[key] = string();
        }
    });

    return object;
}

export function listOf(factory, options = {}) {
    const
        list = [],
        listSize = options.size || integer(Object.assign({}, DEFAULT_SIZE_RANGE, options));

    for (let i = 0; i < listSize; i += 1) {
        list.push(factory());
    }

    return list;
}

export function fromList(list) {
    return list[integer({min: 0, max: list.length})];
}

export default {
    string,
    word,
    integer,
    boolean,
    url,
    email,
    date,
    simpleObject,
    objectWithKeys,
    listOf,
    fromList
};
