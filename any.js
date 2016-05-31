var Chance = require('chance'),
    chance = new Chance();

const DEFAULT_SIZE_RANGE = {
    max: 20,
    min: 1
};

function integer(options) {
    return chance.natural(options);
}

function string(options) {
    return chance.string(options);
}

function word() {
    return chance.word();
}

function url(options) {
    return chance.url(options);
}

function boolean() {
    return chance.bool();
}

function email() {
    return chance.email();
}

function date() {
    return chance.date({string: true});
}

function simpleObject() {
    var object = {},
        size = integer(DEFAULT_SIZE_RANGE);

    for (var i = 0; i < size; i += 1) {
        object[word()] = string();
    }

    return object;
}

function listOf(constructor, options) {
    var options = options || {},
        list = [],
        listSize = options.size || integer(Object.assign({}, DEFAULT_SIZE_RANGE, options));

    for (var i = 0; i < listSize; i += 1) {
        list.push(constructor());
    }

    return list;
}

module.exports = {
    string: string,
    word: word,
    integer: integer,
    boolean: boolean,
    url: url,
    email: email,
    date: date,
    simpleObject: simpleObject,
    listOf: listOf
};
