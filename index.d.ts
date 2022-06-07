import IntegerOptions = Chance.IntegerOptions;
import SentenceOptions = Chance.SentenceOptions;
import WordOptions = Chance.WordOptions;
import StringOptions = Chance.StringOptions;
import UrlOptions = Chance.UrlOptions;
import EmailOptions = Chance.EmailOptions;

declare function simpleObject(): Record<string, string>;

declare function objectWithKeys<T extends string, F, R = string>(
  keys: T[],
  options?: { factory?: F }
): Record<T, F extends (...args: any) => any ? ReturnType<F> : R>;

declare function fromList<T extends unknown>(list: T[]): T;

declare function subList<T extends unknown>(list: T[], options?: { size: number }): T[];

declare function listOf<F extends (...args: any) => any, T = ReturnType<F>>(
  factory: F,
  options?: { size?: number; uniqueOn?: string } & Parameters<typeof integer>[0]
): T[];

declare function string(options?: Partial<StringOptions>): string;

declare function word(options?: Partial<WordOptions>): string;

declare function sentence(options?: Partial<SentenceOptions>): string;

declare function paragraph(options?: { sentences?: number }): string;


declare function integer(options?: Partial<IntegerOptions>): number;

declare function float(options?: Partial<IntegerOptions> & { fixed?: number }): number;

declare function boolean(options?: { likelihood?: number }): boolean;

declare function url(options?: Partial<UrlOptions>): string;

declare function email(options?: Partial<EmailOptions>): string;

declare function date(): string;

declare interface Any {
  simpleObject: typeof simpleObject,
  objectWithKeys: typeof objectWithKeys,
  fromList: typeof fromList,
  subList: typeof subList,
  listOf: typeof listOf,
  string: typeof string,
  word: typeof word,
  sentence: typeof sentence,
  paragraph: typeof paragraph,
  integer: typeof integer,
  float: typeof float,
  boolean: typeof boolean,
  url: typeof url,
  email: typeof email,
  date: typeof date,
}

declare const Any: Any;

export default Any;
