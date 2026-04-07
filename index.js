const TenFour = require('./ten-four');

const tenFour = new TenFour();
tenFour.reports([
  TenFour.Console(
    {
      format: {
        pattern: '([%level]):level (%message):message - (%timestamp):timestamp',
        styles: {
          level: {
            color: 'cyan'
          }
        }
      }
    }
  ),
  // TenFour.Console()
]);

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