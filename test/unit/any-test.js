import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {assert} from 'chai';
import Chance from 'chance';

const
    chance = new Chance(),
    INTEGER_RANGE = {min: 1, max: 10};

function randomListOfStrings() {
    const
        list = [],
        listSize = chance.natural(INTEGER_RANGE);

    for (let i = 0; i < listSize; i += 1) {
        list.push(chance.string());
    }

    return list;
}
suite('random data generator', () => {
    let sandbox, any, chanceStub;
    const options = {foo: 'bar'};

    setup(() => {
        sandbox = sinon.sandbox.create();
        chanceStub = sandbox.stub(new Chance());
        any = proxyquire('../../any', {
            chance: sinon.stub().returns(chanceStub)
        });
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that only positive integers are generated', () => {
        const int = chance.natural();
        chanceStub.natural.withArgs(options).returns(int);

        assert.equal(any.integer(options), int);
    });

    test('that a string is generated', () => {
        const string = chance.string();
        chanceStub.string.withArgs(options).returns(string);

        assert.equal(any.string(options), string);
    });

    test('that a url is generated', () => {
        const url = chance.url();
        chanceStub.url.withArgs(options).returns(url);

        assert.equal(any.url(options), url);
    });

    test('that a url is generated', () => {
        const word = chance.word();
        chanceStub.word.returns(word);

        assert.equal(any.word(options), word);
    });

    test('that a boolean is generated', () => {
        const boolean = chance.bool();
        chanceStub.bool.returns(boolean);

        assert.equal(any.boolean(options), boolean);
    });

    test('that an email is generated', () => {
        const email = chance.email();
        chanceStub.email.returns(email);

        assert.equal(any.email(options), email);
    });

    test('that a date string is generated', () => {
        const date = chance.date();
        chanceStub.date.withArgs({string: true}).returns(date);

        assert.equal(any.date(options), date);
    });

    test('that the object size is randomly set', () => {
        const
            strings = [],
            words = [],
            objectSize = chance.natural(INTEGER_RANGE);
        chanceStub.natural.withArgs({min: 1, max: 20}).returns(objectSize);
        for (let i = 0; i < objectSize; i += 1) {
            const
                string = chance.string(),
                word = chance.word();

            strings[i] = string;
            words[i] = word;

            chanceStub.string.onCall(i).returns(string);
            chanceStub.word.onCall(i).returns(word);
        }

        const object = any.simpleObject();

        assert.equal(Object.keys(object).length, objectSize);
        for (let i = 0; i < objectSize; i += 1) {
            assert.equal(object[words[i]], strings[i]);
        }
    });

    suite('list of', () => {
        let listSize;

        setup(() => {
            listSize = chance.natural(INTEGER_RANGE);
            chanceStub.natural.withArgs({min: 1, max: 20}).returns(listSize);
        });

        test('that a list of random size is returned by default', () => {
            const
                factory = sinon.spy(),
                list = any.listOf(factory);

            assert.equal(list.length, listSize);
            assert.callCount(factory, listSize);
        });

        test('that the list size can be set through the options', () => {
            const
                size = chance.natural(INTEGER_RANGE),
                list = any.listOf(sinon.spy(), {size});

            assert.equal(list.length, size);
        });

        test('that the minimum range limit can be set through the options', () => {
            const min = chance.natural(INTEGER_RANGE);
            chanceStub.natural.withArgs({min, max: 20}).returns(listSize);

            assert.equal(any.listOf(sinon.spy(), {min}).length, listSize);
        });
    });

    suite('from list', () => {
        test('that an item from the provided list is returned', () => {
            const
                list = randomListOfStrings(),
                indexRange = {min: 0, max: list.length},
                index = chance.natural(indexRange);
            chanceStub.natural.withArgs(indexRange).returns(index);

            assert.equal(any.fromList(list), list[index]);
        });
    });

    suite('object with keys', () => {
        test('that an object is generated from the list of keys', () => {
            const
                keys = randomListOfStrings(),
                strings = [];

            for (let i = 0; i < keys.length; i += 1) {
                const string = chance.string();

                strings[i] = string;

                chanceStub.string.onCall(i).returns(string);
            }

            const object = any.objectWithKeys(keys);

            assert.deepEqual(Object.keys(object), keys);
            keys.forEach((key, index) => {
                assert.equal(object[key], strings[index]);
            });
        });

        test('that a factory function can be supplied for values', () => {
            const
                keys = randomListOfStrings(),
                factory = sinon.stub(),
                values = [];

            for (let i = 0; i < keys.length; i += 1) {
                const value = chance.string();

                values[i] = value;

                factory.onCall(i).returns(value);
            }

            const object = any.objectWithKeys(keys, {factory});

            keys.forEach((key, index) => {
                assert.equal(object[key], values[index]);
            });
        });
    });
});
