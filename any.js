import Chance from 'chance';
const chance = new Chance();

const DEFAULT_SIZE_RANGE = {max: 20, min: 1};

const integer = (options) => chance.natural(options);
const string = (options) => chance.string(options);
const word = () => chance.word();
const url = (options) => chance.url(options);
const boolean = () => chance.bool();
const email = () => chance.email();
const date = () => chance.date({string: true});

function simpleObject() {
    var object = {},
        size = integer(DEFAULT_SIZE_RANGE);

    for (var i = 0; i < size; i += 1) {
        object[word()] = string();
    }

    return object;
}

function listOf(factory, options = {}) {
    const
        list = [],
        listSize = options.size || integer(Object.assign({}, DEFAULT_SIZE_RANGE, options));

    for (var i = 0; i < listSize; i += 1) {
        list.push(factory());
    }

    return list;
}

export {
    string,
    word,
    integer,
    boolean,
    url,
    email,
    date,
    simpleObject,
    listOf
};
