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
  var i, el;

  beforeEach(function() {
    el = domify('<p>hi<u></u> there, <strong>matthew <em>muell</em>er</strong>.</p>');
  })

  it('go back', function() {
    i = iterator(el.querySelector('strong').childNodes[2], 1);
    verify(i, 'prev', ['e', 'l', 'l', 'e', 'u', 'm', ' ', 'w', 'e', 'h', 't', 't', 'a', 'm', ' ', ',', 'e', 'r', 'e', 'h', 't', ' ' , 'i', 'h', null]);
  });

  it('go forward', function() {
    i = iterator(el.querySelector('strong').childNodes[2], 1);
    verify(i, 'next', ['r', '.', null]);
  });

  it('should have a good default', function() {
    var i = iterator(el.querySelector('strong').childNodes[2]);
    verify(i, 'next', ['e', 'r', '.', null]);
    i.reset();
    verify(i, 'prev', ['l', 'l', 'e', 'u', 'm', ' ', 'w', 'e', 'h', 't', 't', 'a', 'm', ' ', ',', 'e', 'r', 'e', 'h', 't', ' ' , 'i', 'h', null]);
  })

  it('should work with element nodes', function() {
    var i = iterator(el.querySelector('em'), 3);
    verify(i, 'next', ['l', 'l', 'e', 'r', '.', null]);
    i.reset();
    verify(i, 'prev', ['e', 'u', 'm', ' ', 'w', 'e', 'h', 't', 't', 'a', 'm', ' ', ',', 'e', 'r', 'e', 'h', 't', ' ' , 'i', 'h', null]);
  })
})

function verify(it, dir, expected) {
  expected.forEach(function(expect) {
    var n = it[dir]();
    if (null == expect) return assert(null == n, 'it.' + dir + '() should be null');
    assert(n, 'it.' + dir + '() should not be null. Expected: ' + expect)
    assert(expect == n, 'expected ' + expect + ' got ' + n);
  });
}
