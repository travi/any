import sinon from 'sinon';
import {assert} from 'chai';
import {chance, randomListOfStrings} from '../helpers/data-generator';
import * as baseGenerators from '../../src/base';
import any from '../../src/index';

suite('random data generator', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(baseGenerators, 'integer');
    sandbox.stub(baseGenerators, 'string');
  });

  teardown(() => sandbox.restore());

  suite('from list', () => {
    test('that an item from the provided list is returned', () => {
      const list = randomListOfStrings();
      const indexRange = {min: 0, max: list.length - 1};
      const index = chance.natural(indexRange);
      baseGenerators.integer.withArgs(indexRange).returns(index);

      const item = any.fromList(list);
      assert.isDefined(item);
      assert.equal(item, list[index]);
    });
  });

  suite('object with keys', () => {
    test('that an object is generated from the list of keys', () => {
      const keys = randomListOfStrings();
      const strings = [];

      for (let i = 0; i < keys.length; i += 1) {
        const string = chance.string();

        strings[i] = string;

        baseGenerators.string.onCall(i).returns(string);
      }

      const object = any.objectWithKeys(keys);

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

        factory.withArgs(keys[i]).returns(value);
      }

      const object = any.objectWithKeys(keys, {factory});

      keys.forEach((key, index) => {
        assert.equal(object[key], values[index]);
      });
    });
  });
});
