import {expectError, expectType} from 'tsd';
import any from '.';

expectType<{ [key: string]: string }>(any.simpleObject());

expectType<{ a: number, b: number, c: number }>(any.objectWithKeys(['a', 'b', 'c'], {factory: any.integer()}));
expectError(any.objectWithKeys())

expectType<string | number>(any.fromList(['a', 1]))
expectError(any.fromList())

expectType<string[]>(any.subList(['a', 'b', 'c']))
expectType<string[]>(any.subList(['a', 'b', 'c'], {size: 2}))
expectError(any.subList())

expectType<string>(any.string());
expectType<string>(any.string({length: 1}));
expectType<string>(any.string({length: 1, alpha: true, pool: 'abcde', casing: 'lower', numeric: true, symbols: true}));

expectType<string>(any.word())
expectType<string>(any.word({length: 1}))
expectType<string>(any.word({length: 1, capitalize: true}))
expectType<string>(any.word({length: 1, capitalize: true, syllables: 1}))

expectType<string>(any.sentence())
expectType<string>(any.sentence({words: 1}))
expectType<string>(any.sentence({words: 1, punctuation: '.'}))

expectType<string>(any.paragraph())
expectType<string>(any.paragraph({sentences: 1}))

expectType<number>(any.integer())
expectType<number>(any.integer({min: 1}))
expectType<number>(any.integer({min: 1, max: 2}))

expectType<number>(any.float())
expectType<number>(any.float({min: 1}))
expectType<number>(any.float({min: 1, max: 2}))
expectType<number>(any.float({min: 1, max: 2, fixed: 4}))

expectType<boolean>(any.boolean())
expectType<boolean>(any.boolean({likelihood: 30}))

expectType<string>(any.url());
expectType<string>(any.url({protocol: 'https'}));
expectType<string>(any.url({
  protocol: 'https',
  domain: 'google',
  domain_prefix: 'a',
  path: 'search',
  extensions: ['.jpg']
}));

expectType<string>(any.email());
expectType<string>(any.email({length: 1}));
expectType<string>(any.email({length: 1, domain: 'gmail.com'}));

expectType<string>(any.date());
