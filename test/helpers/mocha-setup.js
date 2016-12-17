import chai from 'chai';
import sinon from 'sinon';
import referee from 'referee';

sinon.assert.expose(chai.assert, {prefix: ''});

referee.format = require('formatio').configure({quoteStrings: false}).ascii;
require('referee-sinon')(referee, sinon);
global.formatio = require('formatio');
