import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {assert} from 'chai';
import Chance from 'chance';

const chance = new Chance();

suite('random data generator', () => {
    let sandbox, any, chanceStub;
    const options = {foo: 'bar'};
    const INTEGER_RANGE = {min: 1, max: 10};

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
        const strings = [];
        const words = [];
        const objectSize = chance.natural(INTEGER_RANGE);
        chanceStub.natural.withArgs({min: 1, max: 20}).returns(objectSize);
        for (let i = 0; i < objectSize; i += 1) {
            const string = chance.string();
            const word = chance.word();

            strings[i] = string;
            words[i] = word;

            chanceStub.string.onCall(i).returns(string);
            chanceStub.word.onCall(i).returns(word);
        }

        var object = any.simpleObject();
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
            const factory = sinon.spy();

            const list = any.listOf(factory);

            assert.equal(list.length, listSize);
            assert.callCount(factory, listSize);
        });

        test('that the list size can be set through the options', () => {
            const size = chance.natural(INTEGER_RANGE);

            const list = any.listOf(sinon.spy(), {size});

            assert.equal(list.length, size);
        });

        test('that the minimum range limit can be set through the options', () => {
            const min = chance.natural(INTEGER_RANGE);
            chanceStub.natural.withArgs({min, max: 20}).returns(listSize);

            const list = any.listOf(sinon.spy(), {min});

            assert.equal(list.length, listSize);
        });
    });

    suite('from list', () => {
        let list;

        setup(() => {
            list = [];
            const listSize = chance.natural(INTEGER_RANGE);
            for (let i = 0; i < listSize; i += 1) {
                list.push(chance.string());
            }
        });

        test('that an item from the provided list is returned', () => {
            const index = chance.natural({min: 0, max: list.length});
            chanceStub.natural.withArgs({min: 0, max: list.length}).returns(index);

            assert.equal(any.fromList(list), list[index]);
        });
    });
});