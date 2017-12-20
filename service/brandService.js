var serviceInvoke = require('../common/serviceInvokeUtils');
var apiConfig = require('../config/apiConfig');

exports.getAllBrand = function (callback) {
  var host = apiConfig.StoreService.host;
  var port = apiConfig.StoreService.port;
  var path = apiConfig.StoreService.path.brand;

  serviceInvoke.get('', host, port, path, callback)
};

exports.addBrand = function (data, callback) {
  var host = apiConfig.StoreService.host;
  var port = apiConfig.StoreService.port;
  var path = apiConfig.StoreService.path.brand;

  serviceInvoke.post(data, host, port, path, callback);
};