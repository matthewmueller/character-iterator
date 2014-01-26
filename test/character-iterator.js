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

  it('should not repeat itself', function() {
    dom = domify('<p>hi there jimmy</p>');
    i = iterator(dom);
    verify(i, 'next', ['h', 'i', ' ', 't', 'h', 'e', 'r', 'e', ' ', 'j', 'i', 'm', 'm', 'y', null])
    i.reset();
    verify(i, 'prev', [null])
  })

  it('should only go in one direction', function() {
    dom = domify('hi there');
    i = iterator(dom);
    // |hi there
    assert('h' == i.next());
    // h|i there
    assert('i' == i.next());
    // hi| there
    assert('i' == i.prev());
    // h|i there
    assert('h' == i.prev());
    // |hi there
    assert(null === i.prev());
  });

  describe('peak', function() {
    it('should allow you to peak in front', function() {
      dom = domify('hi there');
      i = iterator(dom);
      assert('h' == i.peak());
      assert('h' == i.next());
    })

    it('should allow you to peak behind', function() {
      dom = domify('hi there');
      i = iterator(dom, 5);
      assert('h' == i.peak(-1));
      assert('h' == i.prev());
      assert('t' == i.prev());
    })

    it('should allow you to peak in front multiple nodes', function() {
      dom = domify('hi there');
      i = iterator(dom);
      assert('t' == i.peak(4));
      assert('h' == i.next());
    })

    it('should allow you to peak behind multiple nodes', function() {
      dom = domify('hi there');
      i = iterator(dom, 5);
      assert('i' == i.peak(-4));
      assert('h' == i.prev());
      assert('t' == i.prev());
    })

    it('peaking should chain', function() {
      dom = domify('hi there');
      i = iterator(dom);
      assert('h' == i.peak());
      assert('i' == i.peak());
      assert('h' == i.next());
    })

    it('should reset chain after calling next', function() {
      dom = domify('hi there');
      i = iterator(dom);
      assert('h' == i.peak());
      assert('i' == i.peak());
      assert('h' == i.next());
      assert('i' == i.peak());
    })

    it('should reset chain after calling prev', function() {
      dom = domify('hi there');
      i = iterator(dom, 5);
      assert('i' == i.peak(-4));
      assert('h' == i.prev());
      assert('t' == i.peak(-1));
    })
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
