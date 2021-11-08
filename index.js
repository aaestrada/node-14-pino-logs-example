'use strict'

const pino = require('pino')
const { tmpdir } = require('os')
const { join } = require('path');

const file = join(tmpdir(), `pino-${process.pid}-example`);

const transport = pino.transport({
  targets: [{
    level: 'info',
    target: 'pino-elasticsearch',
    options: {
        index: 'an-index',
        type: 'log',
        consistency: 'one',
        node: 'http://localhost:9200',
        'es-version': 6,
        'bulk-size': 200,
        ecs: true
    }
  }, {
    level: 'info',
    target: 'pino-pretty',
    options: {
        destination: 'logs/.log'
    }
  }]
})

const logger = pino(transport)

logger.info('hello world')

const child = logger.child({ a: 'property' })
child.info('hello child!')