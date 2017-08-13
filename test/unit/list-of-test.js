import sinon from 'sinon';
import {assert} from 'chai';
import _ from 'lodash';
import {chance, INTEGER_RANGE, randomListOfStrings} from '../helpers/data-generator';
import * as baseGenerators from '../../src/base';
import realAny from '../../src/index';
import listOf from '../../src/list-of';

suite('list of', () => {
  let sandbox, listSize;

  setup(() => {
    listSize = chance.natural(INTEGER_RANGE);

    sandbox = sinon.sandbox.create();

    sandbox.stub(baseGenerators, 'integer');
    baseGenerators.integer.withArgs({min: 1, max: 20}).returns(listSize);
  });

  teardown(() => sandbox.restore());

  test('that a list of random size is returned by default', () => {
    const factory = sinon.spy();
    const list = listOf(factory);

    assert.equal(list.length, listSize);
    assert.callCount(factory, listSize);
  });

  test('that the list size can be set through the options', () => {
    const size = chance.natural(INTEGER_RANGE);
    const list = listOf(sinon.spy(), {size});

    assert.equal(list.length, size);
  });


  test('that the minimum range limit can be set through the options', () => {
    const min = chance.natural(INTEGER_RANGE);
    baseGenerators.integer.withArgs({min, max: 20}).returns(listSize);

    assert.equal(listOf(sinon.spy(), {min}).length, listSize);
  });

  test('that uniqueness is enforced', () => {
    const uniqueOn = chance.word();
    const nonUniqueValue = randomListOfStrings();
    const min = chance.natural(INTEGER_RANGE);
    const factory = () => ({
      ...realAny.simpleObject(),
      [uniqueOn]: baseGenerators.boolean() ? nonUniqueValue : baseGenerators.string()
    });
    baseGenerators.integer.returns(listSize);
    baseGenerators.integer.withArgs(sinon.match({min})).returns(min);

    const listOfItems = listOf(factory, {uniqueOn});
    const minListOf = listOf(factory, {uniqueOn, min});
    assert.lengthOf(_.uniqBy(listOfItems, uniqueOn), listOfItems.length);
    assert.isAtLeast(minListOf.length, min);
  });
});
