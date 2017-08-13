import {string} from './base';

export default function (keys, options = {}) {
  return keys
    .map(key => (options.factory ? [key, options.factory(key)] : [key, string()]))
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
}
