import sinon from 'sinon';
import {assert} from 'chai';
import {chance, INTEGER_RANGE} from '../helpers/data-generator';
import * as baseGenerators from '../../src/base';
import simpleObject from '../../src/simple-object';

suite('simple object', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(baseGenerators, 'integer');
    sandbox.stub(baseGenerators, 'string');
    sandbox.stub(baseGenerators, 'word');
  });

  teardown(() => sandbox.restore());

  test('that the object size is randomly set', () => {
    const strings = [];
    const words = [];
    const objectSize = chance.natural(INTEGER_RANGE);
    baseGenerators.integer.withArgs({min: 1, max: 20}).returns(objectSize);
    for (let i = 0; i < objectSize; i += 1) {
      const string = chance.string();
      const word = chance.word();

      strings[i] = string;
      words[i] = word;

      baseGenerators.string.onCall(i).returns(string);
      baseGenerators.word.onCall(i).returns(word);
    }

    const object = simpleObject();

    assert.equal(Object.keys(object).length, objectSize);
    for (let i = 0; i < objectSize; i += 1) {
      assert.equal(object[words[i]], strings[i]);
    }
  });
});
