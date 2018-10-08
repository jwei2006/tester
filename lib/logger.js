var log4j = require('log4js');
var logger;

log4j.configure('./log4j.json');

function initLogger(log4jsConfig) {
    log4j.configure(log4jsConfig);
    logger = log4j.getLogger();
}

function getLogger() {
    return logger;
}

function getLoggerByName(name){
    return log4j.getLogger(name);
}

module.exports.loggerFactory = {initLogger, getLogger, getLoggerByName};