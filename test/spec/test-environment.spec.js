
import { expect, sinon } from '../support/test-utils';

describe('test environment unit tests', function() {

  it('"describe" and "it" defined', function() {
    // if we've gotten this far without error... SUCCESS!
  });

  it('"expect" is defined', function() {
    expect(true).to.be.true;
  });

  it('"sinon" is defined', function() {
    const stub = sinon.stub();
    stub();
    expect(stub.calledOnce).to.be.true;
    expect(stub.calledTwice).to.be.false;
  });

  it('"sinon-chai" is used', function() {
    const stub = sinon.stub();
    stub();
    stub();
    expect(stub).to.be.calledTwice;
  });

});
