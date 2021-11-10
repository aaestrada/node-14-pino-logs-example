'use strict'

const pino = require('pino');
const SonicBoom = require('sonic-boom');

const logFiles = ['logs']

mkdirLogs(logFiles);

const transport = pino.transport({
//   targets: [
//   //   {
//   //   level: 'info',
//   //   target: 'pino-elasticsearch',
//   //   options: {
//   //       index: 'an-index',
//   //       type: 'log',
//   //       consistency: 'one',
//   //       node: 'http://localhost:9200',
//   //       'es-version': 6,
//   //       'bulk-size': 200,
//   //       ecs: true
//   //   }
//   // }, 
//   {
//     level: 'info',
//     target: 'pino-pretty',
//     options: {
//         destination: 'logs/.info.log'
//     }
//   },
//   {
//     level: 'error',
//     target: 'pino-pretty',
//     options: {
//         destination: 'logs/.error.log'
//     }
//   }
// ],
  pipeline: [
    {
      target: './transport-transform.js'
    }, {
      target: './to-file-transport.js',
      options: { 
        destination: 'logs/.logs.log'
      }
    }
  ]

});

const logger = pino(transport)

logger.info('hello world');

logger.error('now using my-transport module')

const child = logger.child({ a: 'property' })
child.info('hello child!')

function mkdirLogs(logFiles = []){
  logFiles.map(
    file => { const sonic = new SonicBoom({ dest: `logs/.${file}.log`, mkdir: true });}
  )
}