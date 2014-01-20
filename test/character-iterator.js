/**
 * Module Dependencies
 */

var iterator = require('character-iterator');
var assert = require('assert');
var domify = require('domify');

/**
 * Tests
 */

describe('character-iterator', function() {
  var el;

  beforeEach(function() {
    el = domify('<p>hi<u></u> there, <strong>matthew <em>muell</em>er</strong>.</p>');
  })

  it('go back', function() {
    var it = iterator(el.querySelector('strong').childNodes[2], el, 1);
    assert('e' == it.prev());
    assert('l' == it.prev());
    assert('l' == it.prev());
    assert('e' == it.prev());
    assert('u' == it.prev());
    assert('m' == it.prev());
    assert(' ' == it.prev());
    assert('w' == it.prev());
    assert('e' == it.prev());
    assert('h' == it.prev());
    assert('t' == it.prev());
    assert('t' == it.prev());
    assert('a' == it.prev());
    assert('m' == it.prev());
    assert(' ' == it.prev());
    assert(',' == it.prev());
    assert('e' == it.prev());
    assert('r' == it.prev());
    assert('e' == it.prev());
    assert('h' == it.prev());
    assert('t' == it.prev());
    assert(' ' == it.prev());
    assert('i' == it.prev());
    assert('h' == it.prev());
    assert(null == it.prev())
  });

  it('go forward', function() {
    var it = iterator(el.querySelector('strong').childNodes[2], el, 1);
    assert('r' == it.next());
    assert('.' == it.next());
    assert(null == it.next());
  });

  it('should have a good default', function() {
    var it = iterator(el.querySelector('strong').childNodes[2], el);
    assert('e' == it.next());
    assert('r' == it.next());
  })
})
