# steps

> Steps helper for Mocha

`step()` function, as a drop-in replacement for `it()`. Any failing `step` will abort the all `describe` immediately. This is handy for BDD-like scenarios, or smoke tests that need to run through specific steps.

### Setup

Then simply run mocha with `--require steps`.

### Example

```js
describe('my smoke test', function() {

  step('open page', function() {});

  step('select item', function() {
    throw new Error('failed');
  });

  step('buy item', function() {});
  
  xstep('ignored step', function() {});

});
```

- With the standard it()

```
my smoke test
   ✓ open page
   ✗ select item
   ✓ buy item
```

- Using step()

```
my smoke test
   ✓ open page
   ✗ select item
   - buy item (abort all suites)
```

### Notes

- Unlike Mocha's `--bail` option, the rest of the test suite will run normally.
- `step()` works with both synchronous and async tests.
