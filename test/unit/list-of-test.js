import Chance from 'chance';
import sinon from 'sinon';
import {assert} from 'chai';
import proxyquire from 'proxyquire';

const
    chance = new Chance(),
    INTEGER_RANGE = {min: 1, max: 10};

suite('list of', () => {
    let sandbox, any, chanceStub, listSize;

    setup(() => {
        sandbox = sinon.sandbox.create();
        chanceStub = sandbox.stub(new Chance());
        any = proxyquire('../../any', {
            chance: sinon.stub().returns(chanceStub)
        });

        listSize = chance.natural(INTEGER_RANGE);
        chanceStub.natural.withArgs({min: 1, max: 20}).returns(listSize);
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that a list of random size is returned by default', () => {
        const
            factory = sinon.spy(),
            list = any.listOf(factory);

        assert.equal(list.length, listSize);
        assert.callCount(factory, listSize);
    });

    test('that a list of random size is returned by default when accessed through the default export', () => {
        const
            factory = sinon.spy(),
            list = any.default.listOf(factory);

        assert.equal(list.length, listSize);
        assert.callCount(factory, listSize);
    });

    test('that the list size can be set through the options', () => {
        const
            size = chance.natural(INTEGER_RANGE),
            list = any.listOf(sinon.spy(), {size});

        assert.equal(list.length, size);
    });


    test('that the list size can be set through the options when accessed through the default export', () => {
        const
            size = chance.natural(INTEGER_RANGE),
            list = any.default.listOf(sinon.spy(), {size});

        assert.equal(list.length, size);
    });

    test('that the minimum range limit can be set through the options', () => {
        const min = chance.natural(INTEGER_RANGE);
        chanceStub.natural.withArgs({min, max: 20}).returns(listSize);

        assert.equal(any.listOf(sinon.spy(), {min}).length, listSize);
    });

    test(
        'that the minimum range limit can be set through the options when accessed through the default export',
        () => {
            const min = chance.natural(INTEGER_RANGE);
            chanceStub.natural.withArgs({min, max: 20}).returns(listSize);

            assert.equal(any.default.listOf(sinon.spy(), {min}).length, listSize);
        }
    );
});
