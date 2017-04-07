
# depfetch

## Install

```bash
npm install depfetch
```

## Usage

Fetch dependencies by convention using glob pattern.

```javascript
var depfetch = require('depfetch');
depfetch.glob('**/*Component.js').then(components => {
  console.log(components); // => array of javascript modules
});
```

## Contribution

Contribution documentation can be found [here](CONTRIBUTE.md).
