import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {assert} from 'chai';
import Chance from 'chance';
import {chance, INTEGER_RANGE, randomListOfStrings} from '../helpers/data-generator';

suite('random data generator', () => {
  let sandbox, any, chanceStub;
  const options = {foo: 'bar'};

  setup(() => {
    sandbox = sinon.sandbox.create();
    chanceStub = sandbox.stub(new Chance());
    any = proxyquire('../../src/index', {
      chance: sinon.stub().returns(chanceStub)
    }).default;
  });

  teardown(() => sandbox.restore());

  test('that only positive integers are generated', () => {
    const int = chance.natural();
    chanceStub.natural.withArgs(options).returns(int);

    assert.equal(any.integer(options), int);
  });

  test('that a floating point number is generated', () => {
    const float = chance.floating();
    chanceStub.floating.withArgs(options).returns(float);

    assert.equal(any.float(options), float);
  });

  test('that a string is generated', () => {
    const string = chance.string();
    chanceStub.string.withArgs(options).returns(string);

    assert.equal(any.string(options), string);
  });

  test('that a url is generated', () => {
    const url = chance.url();
    chanceStub.url.withArgs(options).returns(url);

    assert.equal(any.url(options), url);
  });

  test('that a word is generated', () => {
    const word = chance.word();
    chanceStub.word.withArgs({syllables: 3, ...options}).returns(word);

    assert.equal(any.word(options), word);
  });

  test('that syllables can be overridden', () => {
    const word = chance.word();
    const expectedSyllables = any.integer();
    chanceStub.word.withArgs({syllables: expectedSyllables, ...options}).returns(word);

    assert.equal(any.word({syllables: expectedSyllables, ...options}), word);
  });

  test('that length can be used', () => {
    const word = chance.word();
    const length = chance.integer();
    chanceStub.word.withArgs({length, ...options}).returns(word);

    assert.equal(any.word({length, ...options}), word);
  });

  test('that a sentence is generated', () => {
    const sentence = chance.sentence();
    chanceStub.sentence.withArgs(options).returns(sentence);

    assert.equal(any.sentence(options), sentence);
  });

  test('that a paragraph is generated', () => {
    const paragraph = chance.paragraph();
    chanceStub.paragraph.withArgs(options).returns(paragraph);

    assert.equal(any.paragraph(options), paragraph);
  });

  test('that a boolean is generated', () => {
    const boolean = chance.bool();
    chanceStub.bool.withArgs(options).returns(boolean);

    assert.equal(any.boolean(options), boolean);
  });

  test('that an email is generated', () => {
    const email = chance.email();
    chanceStub.email.withArgs(options).returns(email);

    assert.equal(any.email(options), email);
  });

  test('that a date string is generated', () => {
    const date = chance.date();
    chanceStub.date.withArgs({string: true}).returns(date);

    assert.equal(any.date(options), date);
  });

  suite('simple object', () => {
    test('that the object size is randomly set', () => {
      const strings = [];
      const words = [];
      const objectSize = chance.natural(INTEGER_RANGE);
      chanceStub.natural.withArgs({min: 1, max: 20}).returns(objectSize);
      for (let i = 0; i < objectSize; i += 1) {
        const string = chance.string();
        const word = chance.word();

        strings[i] = string;
        words[i] = word;

        chanceStub.string.onCall(i).returns(string);
        chanceStub.word.onCall(i).returns(word);
      }

      const object = any.simpleObject();

      assert.equal(Object.keys(object).length, objectSize);
      assert.alwaysCalledWith(chanceStub.word, {syllables: 3});
      for (let i = 0; i < objectSize; i += 1) {
        assert.equal(object[words[i]], strings[i]);
      }
    });
  });

  suite('from list', () => {
    test('that an item from the provided list is returned', () => {
      const list = randomListOfStrings();
      const indexRange = {min: 0, max: list.length - 1};
      const index = chance.natural(indexRange);
      chanceStub.natural.withArgs(indexRange).returns(index);

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

        chanceStub.string.onCall(i).returns(string);
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
