
import { expect, sinon } from '../support/test-utils';
import depfetch from '../../src/depfetch';
import path from 'path';

describe('depfetch integration tests', function() {

  const sandbox = sinon.sandbox.create();
  const cwd = path.resolve(__dirname, '../testbed');

  afterEach(function() {
    sandbox.restore();
  });

  it('depfetch.glob promise es5 components without options', function() {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    const promise = depfetch.glob('test/**/es5-components/*-component.js');
    return expect(promise).to.eventually.be.eql([componentA, componentB]);
  });

  it('depfetch.glob promise node components without options', function() {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    const promise = depfetch.glob('test/**/node-components/*-component.js');
    return expect(promise).to.eventually.be.eql([componentF, componentG]);
  });

  it('depfetch.glob callback es5 components without options', function(done) {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    depfetch.glob('test/**/es5-components/*-component.js', (err, components) => {
      expect(err).to.be.null;
      expect(components).to.be.eql([componentA, componentB]);
      done();
    });
  });

  it('depfetch.glob callback node components without options', function(done) {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    depfetch.glob('test/**/node-components/*-component.js', (err, components) => {
      expect(err).to.be.null;
      expect(components).to.be.eql([componentF, componentG]);
      done();
    });
  });

  it('depfetch.glob promise es5 components with options', function() {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    const promise = depfetch.glob(
      '**/es5-components/*-component.js', { cwd });
    return expect(promise).to.eventually.eql([componentA, componentB]);
  });

  it('depfetch.glob promise node components with options', function() {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    const promise = depfetch.glob(
      '**/node-components/*-component.js', { cwd });
    return expect(promise).to.eventually.eql([componentF, componentG]);
  });

  it('depfetch.glob callback es5 components with options', function(done) {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    depfetch.glob(
      '**/es5-components/*-component.js',
      { cwd },
      (err, components) => {
        expect(err).to.be.null;
        expect(components).to.be.eql([componentA, componentB]);
        done();
      }
    );
  });

  it('depfetch.glob callback node components with options', function(done) {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    depfetch.glob(
      '**/node-components/*-component.js',
      { cwd },
      (err, components) => {
        expect(err).to.be.null;
        expect(components).to.be.eql([componentF, componentG]);
        done();
      }
    );
  });

  it('depfetch.glob promise invalid component', function() {
    const promise = depfetch.glob(
      '**/invalid-components/*-component.js', { cwd });
    return expect(promise).to.eventually.be.rejected;
  });

  it('depfetch.glob callback invalid component', function(done) {
    depfetch.glob(
      '**/invalid-components/*-component.js',
      { cwd },
      (err, components) => {
        expect(err).to.not.be.null;
        done();
      }
    );
  });

  it('depfetch.globSync es5 components without options', function() {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    const components = depfetch.globSync('test/**/es5-components/*-component.js');
    expect(components).to.eql([componentA, componentB]);
  });

  it('depfetch.globSync node components without options', function() {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    const components = depfetch.globSync('test/**/node-components/*-component.js');
    expect(components).to.eql([componentF, componentG]);
  });

  it('depfetch.globSync es5 components with options', function() {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    const components = depfetch.globSync(
      '**/es5-components/*-component.js', { cwd });
    return expect(components).to.eql([componentA, componentB]);
  });

  it('depfetch.globSync node components with options', function() {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    const components = depfetch.globSync(
      '**/node-components/*-component.js', { cwd });
    expect(components).to.eql([componentF, componentG]);
  });

  it('depfetch.globSync invalid component', function() {
    expect(() => {
      depfetch.globSync(
        '**/invalid-components/*-component.js', { cwd });
    }).to.throw(Error);
  });

});
