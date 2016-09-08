# API Reference

## `simpleObject`

Produces a simple object with a random number of key/value pairs. Each key is a random [word](#word), and each value is
a random [string](#string)

### Example

```js
any.simpleObject();

// { ahe: 'pPwLKrme*OU4@AR1)*^', lel: '6ExqUAyD!', fegcim: 'j03do)OUDhvJ', ucalu: 'L#)zHg5@AV9#vD5O' }
```

## `objectWithKeys`

Produces a simple object with the keys defined from the provided list of keys

### Parameters
* `keys` (required): list of keys to be used for the produced object's keys
* `options`: object to provide configuration options
    * `factory`: factory function to be used to create each of the values for the produced object. defaults to
      [`string`](#string), if not provided

### Examples

```js
any.objectWithKeys(['foo', 'bar', 'baz']);

// { foo: 'eUnRumYAyoS@YVj', bar: 'GvdfJH%]OhNCSDe', baz: 'ozLo2]R' }
```

```js
any.objectWithKeys(['foo', 'bar', 'baz'], {factory: any.url});

// { foo: 'http://hopap.lr/dupro', bar: 'http://kolore.np/cozmavje', baz: 'http://udegowum.cd/ohobasmo' }
```

## `fromList`

Returns one item at random from the provided list.

### Parameters
* `list` (required): list of items to choose from

### Example

```js
any.fromList(['foo', 'bar', 'baz']);

// bar
```

## `listOf`

Produces a list of random items from the provided factory function

### Parameters
* `factory` (required): the factory function for producing the items for the list.
* `options`: object to provide configuration options
    * `size`: length of list that should be produced. defaults to a random number between `1` and `20`, if
      not provided.
    * `uniqueOn`: property on the produced objects that needs to be unique within the resulting list

### Examples

```js
any.listOf(any.string);

// [ 'iQw2[CgBJ1FF8', '58jp*w', 'G]5MoXnKe#F43H3#1', 'oO*a7tY^gbY', 'f$AFjgd$Gg2' ]
```

```js
any.listOf(any.string, {size: 2});

// [ 'wDPGiMtH]fg6o8QxMS', 'OYElY9vO9k4' ]
```

```js
any.listOf(() => ({ id: any.integer(), foo: any.string() }), {uniqueOn: 'id'});

// [ { id: 173289733357568, foo: 'T8XCg*!Q((*Z5@BUFO' }, { id: 8233254624690176, foo: 'ziY]4e%cDoR07g)IhA' } ]
```

## `string`

Direct usage of [`string()` from chance.js](http://chancejs.com/#string). Options are passed directly to the chance
method so refer to its documentation for what is available.

### Note

Be aware that `string()` can include special characters that may not be suitable for some use cases. If they would
cause issues, you may prefer [`word()`](#word) instead.

### Example

```js
any.string();

// 1%BU8#64p%Z
```

## `word`

An almost direct usage of [`word()` from chance.js](http://chancejs.com/#word). No options are passed to the chance
method because I have not had a need for anything but the default version yet.

### Example

```js
any.word();

// nitte
```

## `integer`

Produces a random integer > 0. Direct usage of [`natural()` from chance.js](http://chancejs.com/#natural). Options are
passed directly to the chance method so refer to its documentation for what is available.

### Example

```js
any.integer();

// 8526341888540672
```

## `boolean`

Produces a random boolean value (`true` or `false`).

### Example

```js
any.boolean();

// true
```

## `url`

Direct usage of [`url()` from chance.js](http://chancejs.com/#url). Options are passed directly to the chance
method so refer to its documentation for what is available.

### Example

```js
any.url();

// http://vek.fo/derpu
```

## `email`

An almost direct usage of [`email()` from chance.js](http://chancejs.com/#email). No options are passed to the chance
method because I have not had a need for anything but the default version yet.

### Example

```js
any.email();

// itcobiv@iwo.gq
```

## `date`

An almost direct usage of [`date()` from chance.js](http://chancejs.com/#date). No options passed to the `any` method
are passed to the `chance` method, but the `{string: true}` option is passed because I have only had a use for the string
form of random dates so far.

### Example

```js
any.date();

// 10/24/2028
```
