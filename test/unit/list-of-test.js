import Chance from 'chance';
import sinon from 'sinon';
import {assert} from 'chai';
import proxyquire from 'proxyquire';
import _ from 'lodash';
import {chance, INTEGER_RANGE, randomListOfStrings} from '../helpers/data-generator';
import realAny from '../../src/index';

suite('list of', () => {
  let sandbox, any, chanceStub, listSize;

  setup(() => {
    sandbox = sinon.sandbox.create();
    chanceStub = sandbox.stub(new Chance());
    any = proxyquire('../../src/index', {
      chance: sinon.stub().returns(chanceStub)
    }).default;

    listSize = chance.natural(INTEGER_RANGE);
    chanceStub.natural.withArgs({min: 1, max: 20}).returns(listSize);
  });

  teardown(() => {
    sandbox.restore();
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

    assert.equal(any.listOf(sinon.spy(), {min}).length, listSize);
  });

  test('that uniqueness is enforced', () => {
    const uniqueOn = chance.word();
    const nonUniqueValue = randomListOfStrings();
    const min = chance.natural(INTEGER_RANGE);
    function factory() {
      return Object.assign({}, realAny.simpleObject(), {
        [uniqueOn]: realAny.fromList([nonUniqueValue, chance.string()])
      });
    }
    chanceStub.natural.returns(listSize);
    chanceStub.natural.withArgs(sinon.match({min})).returns(min);

    const listOf = any.listOf(factory, {uniqueOn});
    const minListOf = any.listOf(factory, {uniqueOn, min});
    assert.lengthOf(_.uniqBy(listOf, uniqueOn), listOf.length);
    assert.isAtLeast(minListOf.length, min);
  });
});
