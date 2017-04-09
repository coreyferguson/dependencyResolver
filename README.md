
# depfetch

## Install

```bash
npm install depfetch
```

## Usage

Fetch dependencies by convention using glob pattern.

```javascript
var depfetch = require('depfetch');
depfetch.glob('**/*Module.js').then(modules => {
  console.log(modules); // => array of javascript modules
});
```

For more usage examples see [tests](./test/spec).

## Features

- Supports promises and callbacks.
- Options passed directly to [node-glob](https://github.com/isaacs/node-glob).
- Asynchronous and synchronous APIs.

## depfetch.glob(pattern, [options], [callback])

- `pattern {string}` pattern to be matched
- `options {object}`
- `callback {function}`
    + `err {Error}`
    + `module {Array<module>}`
- return: `Promise` with same contract as callback

Perform an asynchronous glob search for JavaScript dependencies.

## depfetch.globSync(pattern, [options])

- `pattern {string}` pattern to be matched
- `options {object}`
- return `Array` of JavaScript modules (module.export)

Perform a synchronous glob search for JavaScript dependencies.

## Contribution

Contribution documentation can be found [here](CONTRIBUTE.md).
