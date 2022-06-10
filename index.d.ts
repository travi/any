import IntegerOptions = Chance.IntegerOptions;
import SentenceOptions = Chance.SentenceOptions;
import WordOptions = Chance.WordOptions;
import StringOptions = Chance.StringOptions;
import UrlOptions = Chance.UrlOptions;
import EmailOptions = Chance.EmailOptions;

declare interface Any {
  simpleObject(): Record<string, string>;

  objectWithKeys<T extends string, F, R = string>(
    keys: T[],
    options?: { factory?: F }
  ): Record<T, F extends (...args: any) => any ? ReturnType<F> : R>;

  fromList<T extends unknown>(list: T[]): T;

  subList<T extends unknown>(list: T[], options?: { size: number }): T[];

  listOf<F extends (...args: any) => any, T = ReturnType<F>>(
    factory: F,
    options?: { size?: number; uniqueOn?: string } & Parameters<typeof Any['integer']>[0]
  ): T[];

  string(options?: Partial<StringOptions>): string;

  word(options?: Partial<WordOptions>): string;

  sentence(options?: Partial<SentenceOptions>): string;

  paragraph(options?: { sentences?: number }): string;

  integer(options?: Partial<IntegerOptions>): number;

  float(options?: Partial<IntegerOptions> & { fixed?: number }): number;

  boolean(options?: { likelihood?: number }): boolean;

  url(options?: Partial<UrlOptions>): string;

  email(options?: Partial<EmailOptions>): string;

  date(): string;
}
declare const Any: Any;

export default Any;
