
# dependencyResolver

## Install

```bash
npm install dependencyResolver
```

## Usage

Fetch dependencies by convention using glob pattern.

```javascript
var dependenciesByName = require('dependencyResolver');
dependenciesByName.glob('**/*Component.js').then(components => {
  console.log(components); // => array of javascript modules
});
```

## Contribution

Contribution documentation can be found [here](CONTRIBUTE.md).
