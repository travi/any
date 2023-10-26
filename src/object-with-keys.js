import {string} from './base.js';

export default function (keys, options = {}) {
  return keys
    .map((key, index) => (options.factory ? [key, options.factory(key, index)] : [key, string()]))
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
}
