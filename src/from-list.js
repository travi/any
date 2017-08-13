import {integer} from './base';

export default function (list) {
  return list[integer({min: 0, max: list.length - 1})];
}
