var Chance = require('chance'),
    chance = new Chance();

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
        size = integer({max: 20});

    for (var i = 0; i < size; i += 1) {
        object[word()] = string();
    }

    return object;
}

function listOf(constructor, options) {
    var options = options || {},
        list = [],
        listSize = options.size || integer({
            max: 20,
            min: options.min || 1
        });

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
