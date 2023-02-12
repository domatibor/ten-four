const TenFour = require('./ten-four');
const tenFour = new TenFour();

const Logger = {
  info: (message) => tenFour.log('info', message)
};

// Custom logger
Logger.info('Custom logger info log');

// TenFour's own logger system
tenFour.log('info', 'Somethin\' logged');
tenFour.debug('TenFour debug log');
tenFour.info('TenFour info log');
tenFour.warning('TenFour warning log');
tenFour.error('TenFour error log');