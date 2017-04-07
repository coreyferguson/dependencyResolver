
import { expect, sinon } from '../support/test-utils';
import dependencyResolver from '../../src/dependencyResolver';
import path from 'path';

describe('dependencyResolver integration tests', function() {

  const sandbox = sinon.sandbox.create();
  const cwd = path.resolve(__dirname, '../testbed');

  afterEach(function() {
    sandbox.restore();
  });

  it('promise es5 components without options', function() {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    const promise = dependencyResolver.glob('**/es5-components/*-component.js');
    return expect(promise).to.eventually.be.eql([componentA, componentB]);
  });

  it('promise node components without options', function() {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    const promise = dependencyResolver.glob('**/node-components/*-component.js');
    return expect(promise).to.eventually.be.eql([componentF, componentG]);
  });

  it('callback es5 components without options', function(done) {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    dependencyResolver.glob('**/es5-components/*-component.js', (err, components) => {
      expect(err).to.be.null;
      expect(components).to.be.eql([componentA, componentB]);
      done();
    });
  });

  it('callback node components without options', function(done) {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    dependencyResolver.glob('**/node-components/*-component.js', (err, components) => {
      expect(err).to.be.null;
      expect(components).to.be.eql([componentF, componentG]);
      done();
    });
  });

  it('promise es5 components with options', function() {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    const promise = dependencyResolver.glob(
      '**/es5-components/*-component.js', { cwd });
    return expect(promise).to.eventually.eql([componentA, componentB]);
  });

  it('promise node components with options', function() {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    const promise = dependencyResolver.glob(
      '**/node-components/*-component.js', { cwd });
    return expect(promise).to.eventually.eql([componentF, componentG]);
  });

  it('callback es5 components with options', function(done) {
    const componentA = require('../testbed/es5-components/a-component').default;
    const componentB = require('../testbed/es5-components/b-component').default;
    dependencyResolver.glob(
      '**/es5-components/*-component.js',
      { cwd },
      (err, components) => {
        expect(err).to.be.null;
        expect(components).to.be.eql([componentA, componentB]);
        done();
      }
    );
  });

  it('callback node components with options', function(done) {
    const componentF = require('../testbed/node-components/f-component');
    const componentG = require('../testbed/node-components/g-component');
    dependencyResolver.glob(
      '**/node-components/*-component.js',
      { cwd },
      (err, components) => {
        expect(err).to.be.null;
        expect(components).to.be.eql([componentF, componentG]);
        done();
      }
    );
  });

  it('promise invalid component', function() {
    const promise = dependencyResolver.glob(
      '**/invalid-components/*-component.js', { cwd });
    return expect(promise).to.eventually.be.rejected;
  });

  it('callback invalid component', function(done) {
    dependencyResolver.glob(
      '**/invalid-components/*-component.js',
      { cwd },
      (err, components) => {
        expect(err).to.not.be.null;
        done();
      }
    );
  });

});
