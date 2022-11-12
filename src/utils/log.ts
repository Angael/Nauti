import logger from 'simple-node-logger';

const log = logger.createSimpleLogger({
  timestampFormat: 'HH:mm:ss.SSS',
  level: 'debug',
  prettyPrint: true,
  separator: ' - ',
});

export default log;
