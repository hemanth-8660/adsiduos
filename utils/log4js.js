const log4js = require('log4js');

log4js.configure({
    appenders: {
        app: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '[%d] [%p] [%c] - %m'
            }
        }
    },
    categories: {
        default: {
            appenders: [
                'app'
            ],
            level: 'debug'
        }
    }
})

module.exports = { 
    getLogger: (name) => {
        return log4js.getLogger(name);
    }
 };