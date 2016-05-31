import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {assert} from 'chai';
import Chance from 'chance';

const chance = new Chance();

suite('random data generator', () => {
    let sandbox, any, chanceStub;
    const options = {foo: 'bar'};

    setup(() => {
        sandbox = sinon.sandbox.create();
        chanceStub = sandbox.stub(chance);
        any = proxyquire('../../any', {
            chance: sinon.stub().returns(chanceStub)
        });
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that only positive integers are generated', () => {
        var int = chance.natural();
        chanceStub.natural.withArgs(options).returns(int);

        assert.equal(any.integer(options), int);
    });

    test('that a string is generated', () => {
        var string = chance.string();
        chanceStub.string.withArgs(options).returns(string);

        assert.equal(any.string(options), string);
    });

    test('that a url is generated', () => {
        var url = chance.url();
        chanceStub.url.withArgs(options).returns(url);

        assert.equal(any.url(options), url);
    });

    test('that a url is generated', () => {
        var word = chance.word();
        chanceStub.word.returns(word);

        assert.equal(any.word(options), word);
    });

    test('that a boolean is generated', () => {
        var boolean = chance.bool();
        chanceStub.bool.returns(boolean);

        assert.equal(any.boolean(options), boolean);
    });

    test('that an email is generated', () => {
        var email = chance.email();
        chanceStub.email.returns(email);

        assert.equal(any.email(options), email);
    });

    test('that a date string is generated', () => {
        var date = chance.date();
        chanceStub.date.withArgs({string: true}).returns(date);

        assert.equal(any.date(options), date);
    });
});