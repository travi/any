# API Reference

* [`simpleObject`](#simpleobject)
* [`objectWithKeys`](#objectwithkeys)
* [`fromList`](#fromlist)
* [`listOf`](#listof)
* [`string`](#string)
* [`word`](#word)
* [`sentence`](#sentence)
* [`paragraph`](#paragraph)
* [`integer`](#integer)
* [`float`](#float)
* [`boolean`](#boolean)
* [`url`](#url)
* [`email`](#email)
* [`date`](#date)
* [`subset`](#subset)

## `simpleObject`

Produces a simple object with a random number of key/value pairs. Each key is a
random [word](#word), and each value is a random [string](#string)

### Example

```js
any.simpleObject();

// { ahe: 'pPwLKrme*OU4@AR1)*^', lel: '6ExqUAyD!', fegcim: 'j03do)OUDhvJ', ucalu: 'L#)zHg5@AV9#vD5O' }
```

## `objectWithKeys`

Produces a simple object with the keys defined from the provided list of keys

### `objectWithKeys` parameters

* `keys` (required): list of keys to be used for the produced object's keys
* `options`: object to provide configuration options
  * `factory`: factory function to be used to create each of the values for the
    produced object
    * receives the current key as the first argument and the index as the second
    * defaults to [`string`](#string), if not provided

### `objectWithKeys` examples

```js
any.objectWithKeys(['foo', 'bar', 'baz']);

// { foo: 'eUnRumYAyoS@YVj', bar: 'GvdfJH%]OhNCSDe', baz: 'ozLo2]R' }
```

```js
any.objectWithKeys(['foo', 'bar', 'baz'], {factory: any.url});

// { foo: 'http://hopap.lr/dupro', bar: 'http://kolore.np/cozmavje', baz: 'http://udegowum.cd/ohobasmo' }
```

```js
any.objectWithKeys(['foo', 'bar', 'baz'], {factory: id => ({...any.simpleObject(), id})});

/*
{
  foo: {
     ipsawiw: '$McveM',
     comgahra: ']TORpXOYqKQz&G]h',
     ranimedo: 'Q^Y)ga2FG^jPzs](',
     owabopmom: 'YQz[MoIEVHLbVG',
     jebaru: 'qd&TpwaMEp8Vz#al8C',
     zuwbedil: 'LC&c3$gPxI',
     id: 'foo'
  },
  bar: {
     jahaluz: '#HD0Zqs$QLxAC@Lrb*',
     ekofesi: 'uhAOs',
     veuhotuh: 'ob1K2TDc5Q',
     zuufciw: 'L&hqNtx@',
     riptutru: 'mYSXLZh#OmWvaJC2',
     obebetmi: '[E@yC^xTBia*]kdvfC',
     hugmoug: 'DfV8Qs9f8O433etJ',
     zusurare: '0I0!xzrxEN$f4',
     gonefo: 'YkLh9Sg&f7o%K)VDT',
     watbihli: '3F2]ofS',
     elaecave: 'iY@uTDWy@J',
     id: 'bar'
  },
  baz: {
     zehitek: '7$GlW8N',
     upagpu: '9^UDxLQKp',
     aniheiju: '9$lJPW6$eXhPf$GFa',
     ekaradcun: ')nD1)rC&c^',
     molilji: 'qvr7dW$Ve0uR3fkZ]',
     jebowibuf: '0G6vTn)71NsXWsr]ypd',
     wednotso: '2hHmqvDlw&&!^ycJ0',
     arewibvuf: '*N^&UXo$c&eAiF^',
     gutuet: '^JHXnzETi*VSuUy(3b',
     molwadi: 'x!dAw',
     fuglekpe: 'WqDOaU2[LdAvHm',
     ireakiuso: '@VG9BF$)F',
     id: 'baz'
   }
 }
 */
```

```js
const qux = ['a', 'b', 'c'];

any.objectWithKeys(['foo', 'bar', 'baz'], {factory: (id, index) => ({id, letter: qux[index]})});

/*
{
  foo: { id: 'foo', letter: 'a' },
  bar: { id: 'bar', letter: 'b' },
  baz: { id: 'baz', letter: 'c' }
}
*/
```

## `fromList`

Direct usage of [`pickone()` from chance.js](http://chancejs.com/helpers/pickone.html).

### `fromList` parameters

* `list` (required): list of items to choose from

### `fromList` example

```js
any.fromList(['foo', 'bar', 'baz']);

// bar
```

## `listOf`

Produces a list of random items from the provided factory function

### `listOf` parameters

* `factory` (required): the factory function for producing the items for the list.
  * receives the current index as the first argument
* `options`: object to provide configuration options
  * `size`: length of list that should be produced
    * defaults to a random number between `1` and `20`, if not provided
    * the default range of potential sizes can be overridden by providing options
      for [integer](#integer)
  * `uniqueOn`: property on the produced objects that needs to be unique within
    the resulting list

### `listOf` examples

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

Direct usage of [`string()` from chance.js](http://chancejs.com/basics/string.html).
Options are passed directly to the chance method so refer to its documentation
for what is available.

### Note

Be aware that `string()` can include special characters that may not be suitable
for some use cases. If they would cause issues, you may prefer [`word()`](#word)
instead.

### `string` example

```js
any.string();

// 1%BU8#64p%Z
```

## `word`

Direct usage of [`word()` from chance.js](http://chancejs.com/text/word.html).
Options are passed directly to the chance method so refer to its documentation
for what is available.

### `word` example

```js
any.word();

// nitte
```

## `sentence`

Direct usage of [`sentence()` from chance.js](http://chancejs.com/text/sentence.html).
Options are passed directly to the chance method so refer to its documentation
for what is available.

### `sentence` example

```js
any.sentence();

// 'Witpevze mappos isoletu fo res bi geow pofin mu rupoho revzi utva ne.'
```

## `paragraph`

Direct usage of [`paragraph()` from chance.js](http://chancejs.com/text/paragraph.html).
Options are passed directly to the chance method so refer to its documentation
for what is available.

### `paragraph` example

```js
any.paragraph();

// 'Lel fi huepe jupu akse zej ire vesik kojvulom zon is biwuwkef pa. Uv hokivej voh ebu
// numdogi akolo hik uwlez ta vacev ofdaimi acunetum suvet uhdab ir soglazo ju pafbeb. Pub
// cezeh fuc kebamnul he ok luumoabi rawkig me fov pin zup biv risugra. Ralpunad apkomgib
// alnirciw akel wa lus wahfum burog buol vecotihe abadahoj ugolo wovki ucojal fec.'
```

## `integer`

Produces a random integer >= 0. Direct usage of
[`natural()` from chance.js](http://chancejs.com/basics/natural.html).
Options are passed directly to the chance method so refer to its
documentation for what is available.

### `integer` example

```js
any.integer();

// 8526341888540672
```

## `float`

Direct usage of [`floating()` from chance.js](http://chancejs.com/basics/floating.html).
Options are passed directly to the chance method so refer to its documentation
for what is available.

### `float` example

```js
any.float();

// -114981703621.0176
```

## `boolean`

Produces a random boolean value (`true` or `false`).
Options are passed directly to the chance method so refer to its documentation
for what is available.

### `boolean` example

```js
any.boolean();

// true
```

## `url`

Direct usage of [`url()` from chance.js](http://chancejs.com/web/url.html).
Options are passed directly to the chance method so refer to its
documentation for what is available.

### `url` example

```js
any.url();

// http://vek.fo/derpu
```

## `email`

Direct usage of [`email()` from chance.js](http://chancejs.com/web/email.html).
Options are passed directly to the chance method so refer to its documentation
for what is available.

### `email` example

```js
any.email();

// itcobiv@iwo.gq
```

## `date`

An almost direct usage of [`date()` from chance.js](http://chancejs.com/time/date.html).
No options passed to the `any` method are passed to the `chance` method, but
the `{string: true}` option is passed because I have only had a use for the
string form of random dates so far.

### `date` example

```js
any.date();

// 10/24/2028
```

## `subset`

An almost direct usage of [`pickset()` from chance.js](http://chancejs.com/helpers/pickset.html).
The `size` option is passed directly to the chance method's `quantity` argument so
refer to its documentation for what is available.

### `subset` parameters

* `list` (required): list of items the subset will be taken from
* `options`: object to provide configuration options
  * `size`: size of the subset to attempt to generate from the given list
    * if the value is larger than the size of the list, the subset will
      be the entire list.
    * defaults to `2` if not provided

### `subset` example

```js
any.subset(['one', 'two', 'three', 'four'], 2);

// ['two', 'four']
```
