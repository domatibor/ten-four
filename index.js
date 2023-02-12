'use strict';

function TenFour() {
}

Object.defineProperty(TenFour.prototype, '_stdout', {
  get: function() {
    return process.stdout;
  }
});

TenFour.prototype.log = function(message) {
  this._stdout.write(message);
}

const tenFour = new TenFour();
tenFour.log('Message');