
# character-iterator

  Iterate through text characters in the DOM tree. Handles parent & sibling relationships.

## Installation

  Install with [component(1)](http://component.io):

    $ component install matthewmueller/character-iterator

### Example

```js
var el = domify('<p>hi<u></u> there, <strong>cowboy <em>dude</em>!</strong>!</p>');
var it = iterator(el.querySelector('em'), 2)
assert('d' == it.next());
assert('e' == it.next());
assert('!' == it.next());
assert('!' == it.next());
```

## API

### `iterator(el, [parent], [offset])`

Get the next character in the DOM starting at `el` with `offset`. If `offset` isn't specified it defaults to 0. `parent` is used to limit the distance the iterator travels. `parent` defaults to `document.body`.

### `iterator#next()`

Move on to the next character. If at the end, return `null`.

### `iterator#prev()`

Move on to the previous character. If at the end, return `null`.

## Test

```js
npm install component-test
make test
```

## License

  MIT
