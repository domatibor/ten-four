'use strict';

const LEVELS = {
  0: 'debug',
  1: 'info',
  2: 'warning',
  3: 'error'
};

function TenFour() {
  this.levels = LEVELS;
}

Object.defineProperty(TenFour.prototype, '_stdout', {
  get: function() {
    return process.stdout;
  }
});

TenFour.prototype.log = function(level, message) {
  if (Object.values(this.levels).indexOf(level) === -1) {
    throw Error(`There is no log level with name ${level}`);
  }
  this._stdout.write(JSON.stringify({ level, message, timestamp: Date.now() }) + '\n');
}

TenFour.prototype.debug = function(message) {
  this.log('debug', message);
}

TenFour.prototype.info = function(message) {
  this.log('info', message);
}

TenFour.prototype.warning = function(message) {
  this.log('warning', message);
}

TenFour.prototype.error = function(message) {
  this.log('error', message);
}

module.exports = TenFour;