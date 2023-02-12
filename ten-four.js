'use strict';

const LEVELS = {
  0: 'debug',
  1: 'info',
  2: 'warning',
  3: 'error'
};

function TenFour() {
  this.levels = LEVELS;
  this.reporters = [];
}

/* Object.defineProperty(TenFour.prototype, '_stdout', {
  get: function() {
    return process.stdout;
  }
}); */

TenFour.prototype.log = function(level, message) {
  if (Object.values(this.levels).indexOf(level) === -1) {
    throw Error(`There is no log level with name ${level}`);
  }
  const timestamp = Date.now();
  const log = JSON.stringify({ level, message, timestamp });
  for (const reporter of this.reporters) {
    reporter.log(log);
  }
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

TenFour.prototype.reports = function(reporters) {
  this.reporters = reporters;
}

TenFour.Console = function() {
  return {
    log: function(log) {
      process.stdout.write(log + '\n');
    }
  };
}

module.exports = TenFour;