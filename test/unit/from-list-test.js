import sinon from 'sinon';
import {assert} from 'chai';
import {chance, randomListOfStrings} from '../helpers/data-generator';
import * as baseGenerators from '../../src/base';
import fromList from '../../src/from-list';

suite('from-list', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(baseGenerators, 'integer');
  });

  teardown(() => sandbox.restore());

  test('that an item from the provided list is returned', () => {
    const list = randomListOfStrings();
    const indexRange = {min: 0, max: list.length - 1};
    const index = chance.natural(indexRange);
    baseGenerators.integer.withArgs(indexRange).returns(index);

    const item = fromList(list);
    assert.isDefined(item);
    assert.equal(item, list[index]);
  });
});
