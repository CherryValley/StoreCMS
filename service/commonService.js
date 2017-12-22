var serviceInvoke = require('../common/serviceInvokeUtils');
var sysConfig = require('../config/sysConfig');
var apiConfig = require('../config/apiConfig');

exports.CommonService = function(apiName) {
  this.pageSize = sysConfig.pageSize;
  this.host = apiConfig.StoreService.host;
  this.port = apiConfig.StoreService.port;
  this.path = apiConfig.StoreService.path[apiName];
  this.getAll = function (pageNumber, callback) {
    serviceInvoke.get(this.host, this.port, this.path + '/' + pageNumber + '/' + this.pageSize, callback)
  };
  this.add = function (data, callback) {
    serviceInvoke.post(data, this.host, this.port, this.path, callback);
  };
  this.change = function (data, callback) {
    serviceInvoke.put(data, this.host, this.port, this.path, callback);
  };
  this.delete = function (id, callback) {
    serviceInvoke.delete(this.host, this.port, this.path + '/' + id, callback);
  }
};