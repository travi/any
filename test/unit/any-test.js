import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {assert} from 'chai';

var chanceStub = {
    bool: () => undefined,
    date: () => undefined,
    email: () => undefined,
    natural: () => undefined,
    string: () => undefined,
    url: () => undefined,
    word: () => undefined
};

const any = proxyquire('../../any', {
    chance: sinon.stub().returns(chanceStub)
});

suite('random data generator', () => {
    let sandbox;
    const options = {foo: 'bar'};

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(chanceStub, 'bool');
        sandbox.stub(chanceStub, 'date');
        sandbox.stub(chanceStub, 'email');
        sandbox.stub(chanceStub, 'natural');
        sandbox.stub(chanceStub, 'string');
        sandbox.stub(chanceStub, 'url');
        sandbox.stub(chanceStub, 'word');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that only positive integers are generated', () => {
        var int = 'foo';
        chanceStub.natural.withArgs(options).returns(int);

        assert.equal(any.integer(options), int);
    });

    test('that a string is generated', () => {
        var str = 'foo';
        chanceStub.string.withArgs(options).returns(str);

        assert.equal(any.string(options), str);
    });

    test('that a url is generated', () => {
        var url = 'foo';
        chanceStub.url.withArgs(options).returns(url);

        assert.equal(any.url(options), url);
    });

    test('that a url is generated', () => {
        var word = 'foo';
        chanceStub.word.returns(word);

        assert.equal(any.word(options), word);
    });

    test('that a boolean is generated', () => {
        var boolean = 'foo';
        chanceStub.bool.returns(boolean);

        assert.equal(any.boolean(options), boolean);
    });

    test('that an email is generated', () => {
        var email = 'foo';
        chanceStub.email.returns(email);

        assert.equal(any.email(options), email);
    });

    test('that a date string is generated', () => {
        var date = 'foo';
        chanceStub.date.withArgs({string: true}).returns(date);

        assert.equal(any.date(options), date);
    });
});