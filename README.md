# Random data generator

[![Greenkeeper badge](https://badges.greenkeeper.io/travi/any.svg)](https://greenkeeper.io/)

[![npm](https://img.shields.io/npm/v/@travi/any.svg?maxAge=2592000)](https://www.npmjs.com/package/@travi/any)
[![license](https://img.shields.io/github/license/travi/any.svg)](LICENSE)
[![Build Status](https://img.shields.io/travis/travi/any.svg?style=flat)](https://travis-ci.org/travi/any)
[![Coverage Status](http://img.shields.io/coveralls/travi/any.svg?style=flat)](https://coveralls.io/r/travi/any?branch=master)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Random data generator for when test data is insignificant. Tailoring data too
closely for the domain can end up being confusing in tests because it distracts
from the behavior that is actually important in the test. This is why I prefer
to make it very clear when test data is insignificant by using a data generator.
This library captures most of the patterns I use frequently.

## Based on Chance.js

To save myself from needing to maintain the actual data generators, this library
leverages [Chance.js](http://chancejs.com/) for generating the data. So why not
just use Chance.js directly?

* I find it annoying that an instance of Chance has to be created. Rather than
  initialize an instance in every module, I wrap a single instance for reuse
  throughout the tests.
* I can set my default options to align with my typical conventions rather than
  having to repeatedly configure Chance.js's very flexible API
* Lots of my tests need objects to be generated, but the structure of those
  objects typically does not matter. Chance.js does not have a
  [simple-object generator](docs/API.md#simpleobject), so I've included that on
  my own.
* Many of my tests need [lists](docs/API.md#listof) generated. Like objects,
  Chance.js does not generate lists, so I've included this on my own.

## Install

```bash
$ npm install @travi/any --save-dev
```

## Documentation

* [API](docs/API.md)
* [Debugging](docs/DEBUG.md)
