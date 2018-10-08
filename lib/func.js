
var logger = require('logger').loggerFactory;
var testUtil = require('./testUtil');
var async = require('async');
var should = require('should');
var request = require('./config').getRequest();
// exports.setRequest = function(r){
//     request = r;
// };

var fs = require('./fs');

var comparator = require('./comparator');

exports.get = function (caseName, url, param, assertFunction, done) {
    let currParam = param.param || param;
    request.get(url)
             .set('Content-type', 'application/json')
             .query(currParam)
             .expect(200)
             .end(function (err, res) {
                 afterRequest(caseName, param, err, res.body, assertFunction, done);
             });
};

exports.post = function (caseName, url, param, assertFunction, done) {
    let currParam = param.param || param;
    request.post(url)
        .set('Content-type', 'application/json')
        .send(currParam)
        .expect(200)
        .end(function (err, res) {
            afterRequest(caseName, param, err, res.body, assertFunction, done);
        });
};

exports.put = function (caseName, url, param, assertFunction, done) {
    let currParam = param.param || param;
    request.put(url)
        .set('Content-type', 'application/json')
        .send(currParam)
        .expect(200)
        .end(function (err, res) {
            afterRequest(caseName, param, err, res.body, assertFunction, done);
        });
};

exports.delete = function (caseName, url, param, assertFunction, done) {
    let currParam = param.param || param;
    request.delete(url)
        .set('Content-type', 'application/json')
        .send(currParam)
        .expect(200)
        .end(function (err, res) {
            afterRequest(caseName, param, err, res.body, assertFunction, done);
        });
};

let afterRequest = function (caseName, param, err, res, assertFunction, done) {
    if (err) throw new Error(err);
    else fs.saveTemp(caseName, JSON.stringify(res));

    assertFunction(err, res);
    sysAssert(param, res);
    sysAssert(param, res);
    dataAssert(caseName, res);
    done();
};

let sysAssert = function (param, res) {
    if(!param.result) return;
    comparator(param.result, res);
};

let dataAssert = function (caseName, res) {
    let standard = fs.readStandardData(caseName);
    if(undefined == standard || null == standard) return;
    comparator(JSON.parse(standard), res);
};




