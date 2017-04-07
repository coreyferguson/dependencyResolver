
import glob from 'glob';
import path from 'path';
import bluebird from 'bluebird';

export class Depfetch {

  constructor(glob) {
    this._glob = bluebird.promisify(glob);
  }

  glob(pattern, options, callback) {
    // `options` and `callback` are both optional
    // perform the necessary translation depending on what was pased
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    // default options
    options = Object.assign({
      cwd: process.cwd()
    }, options);
    // evaluate glob pattern and return components
    return this._glob(pattern, options).then(files => {
      files = files
        .map(file => path.resolve(options.cwd, file))
        .map(require)
        .map(component =>
          (component.default)
          ? component.default
          : component);
      if (callback) callback(null, files);
      return files;
    }).catch(err => {
      if (callback) callback(err);
      else return Promise.reject(err);
    });
  }

}

const singleton = new Depfetch(glob);
export default singleton;
