import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {assert} from 'chai';

var chanceStub = {
    natural: () => undefined
};

const any = proxyquire('../../any', {
    chance: sinon.stub().returns(chanceStub)
});

suite('random data generator', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(chanceStub, 'natural');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that only positive integers are generated', () => {
        var int = 'foo';
        chanceStub.natural.returns(int);

        var integer = any.integer();

        assert.equal(integer, int);
    });
});