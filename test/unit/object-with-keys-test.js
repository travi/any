import sinon from 'sinon';
import {assert} from 'chai';

import {chance, randomListOfStrings} from '../helpers/data-generator.js';
import * as baseGenerators from '../../src/base.js';
import objectWithKeys from '../../src/object-with-keys.js';

suite('object with keys', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(baseGenerators, 'string');
  });

  teardown(() => sandbox.restore());

  test('that an object is generated from the list of keys', () => {
    const keys = randomListOfStrings();
    const strings = [];

    for (let i = 0; i < keys.length; i += 1) {
      const string = chance.string();

      strings[i] = string;

      baseGenerators.string.onCall(i).returns(string);
    }

    const object = objectWithKeys(keys);

    assert.deepEqual(Object.keys(object), keys);
    keys.forEach((key, index) => {
      assert.equal(object[key], strings[index]);
    });
  });

  test('that a factory function can be supplied for values', () => {
    const keys = randomListOfStrings();
    const factory = sinon.stub();
    const values = [];

    for (let i = 0; i < keys.length; i += 1) {
      const value = chance.string();

      values[i] = value;

      factory.withArgs(keys[i], i).returns(value);
    }

    const object = objectWithKeys(keys, {factory});

    keys.forEach((key, index) => {
      assert.equal(object[key], values[index]);
    });
  });
});
