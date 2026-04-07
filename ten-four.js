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

TenFour.Console = function(config) {
  return {
    log: function(log) {
      const formatted = TenFour.Format(log, config.format.pattern, config.format.styles);
      process.stdout.write(formatted + '\n');
    }
  };
}

TenFour.Format = function(log, pattern, style) {
  const PATTERN = /(?<context>\((?<content>.*?)\):(?<variable>[a-z]*))/g;
  const matches = pattern.matchAll(PATTERN);
  let replaced = pattern;
  for (const match of matches) {
    const { context, content, variable } = match.groups;
    const wrappedContent = `\x1b[34m${content}\x1b[0m`;
    replaced = replaced.replace(context, wrappedContent);
  }
  return replaced;
}

module.exports = TenFour;