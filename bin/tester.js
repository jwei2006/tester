#!/usr/bin/env node


var fs = require('../lib/fs');

process.argv.slice(2).forEach(function(arg) {
    var flag = arg.split('=')[0];
console.info(flag);
    switch (flag) {
        case '-clear':
            fs.clearAll();
            break;
        case '-save':
            fs.saveFormal();
            break;
    }
});