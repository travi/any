# Random data generator

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Codecov][coverage-badge]][coverage-link]
![SLSA Level 2][slsa-badge]

<!--status-badges end -->

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

## Usage

<!--consumer-badges start -->

[![npm][npm-badge]][npm-link]
![node][node-badge]
[![license](https://img.shields.io/github/license/travi/any.svg?style=flat)](LICENSE)
[![monthly downloads](https://img.shields.io/npm/dm/@travi/any.svg?style=flat)](https://www.npmjs.com/package/@travi/any)
[![Try @travi/any on RunKit](https://badge.runkitcdn.com/@travi/any.svg)](https://npm.runkit.com/@travi/any)

<!--consumer-badges end -->

### Install

```sh
$ npm install @travi/any --save-dev
```

### Documentation

* [API](docs/API.md)
* [Debugging](docs/DEBUG.md)

## Contributing

<!--contribution-badges start -->

[![PRs Welcome][prs-badge]][prs]
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Renovate][renovate-badge]][renovate-link]
[![semantic-release: angular][semantic-release-badge]][semantic-release-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```

### Typescript Types

When making changes to the API, these changes must be reflected in the types
file (`index.d.ts`). This library uses `tsd` to test the types. These tests
can be found at `index.d-test.ts`. As you make changes to the API, first update
`index.d-test.ts` with the expected results, then update `index.d.ts` with
the appropriate types to satisfy the tests.

[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[prs]: http://makeapullrequest.com

[renovate-link]: https://renovatebot.com

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot

[github-actions-ci-link]: https://github.com/travi/any/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://img.shields.io/github/actions/workflow/status/travi/any/node-ci.yml.svg?branch=master&logo=github

[coverage-link]: https://codecov.io/github/travi/any

[coverage-badge]: https://img.shields.io/codecov/c/github/travi/any?logo=codecov

[slsa-badge]: https://slsa.dev/images/gh-badge-level2.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release

[node-badge]: https://img.shields.io/node/v/@travi/any?logo=node.js

[npm-link]: https://www.npmjs.com/package/@travi/any

[npm-badge]: https://img.shields.io/npm/v/@travi/any?logo=npm
