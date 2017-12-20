var http = require('http');
var qs = require('querystring');
var util = require('util');

exports.get = function(param, host, port, path, callback){
  var options = {
    hostname: host,
    port: port,
    path: path + '?' + qs.stringify(param),
    method: 'GET'
  };

  var content = '';
  var req = http.request(options, function (res) {
    if(res.statusCode === 200){
      res.setEncoding('utf8');
      res.on('data', function (data) {
        content += data.toString();
      }).on('end', function(){
        content = JSON.parse(content);
        return callback({
          'err': false,
          'content': content
        });
      });
    }else{
      return callback({
        'err': true,
        'code': '-1',
        'msg': '服务器系统异常。',
        'detail': util.format('invoke service failed. statusCode:[%s], host:[%s], port:[%s], path:[%s], param:[%s]', res.statusCode, host, port, path, param)
      });
    }
  });

  req.on('error', function (e) {
    return callback({
      'err': true,
      'code': '-2',
      'msg': '服务器连接失败。',
      'detail': util.format('invoke service error. host:[%s], port:[%s], path:[%s], param:[%s], reason:[%s]', host, port, path, param, e.message)
    });
  });

  req.end();
};

exports.post = function(data, host, port, path, callback){
  data = qs.stringify(data);
  var options = {
    hostname: host,
    port: port,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      "Content-Length": data.length
    }
  };

  var content = '';
  var req = http.request(options, function (res) {
    if(res.statusCode === 200){
      res.setEncoding('utf8');
      res.on('data', function (data) {
        content += data.toString();
      }).on('end', function(){
        content = JSON.parse(content);
        return callback({
          'err': false,
          'content': content
        });
      });
    }else{
      return callback({
        'err': true,
        'code': '-1',
        'msg': '服务器系统异常。',
        'detail': util.format('invoke service failed. statusCode:[%s], host:[%s], port:[%s], path:[%s], data:[%s]', res.statusCode, host, port, path, JSON.stringify(data))
      });
    }
  });

  req.on('error', function (e) {
    return callback({
      'err': true,
      'code': '-2',
      'msg': '服务器连接失败。',
      'detail': util.format('invoke service error. host:[%s], port:[%s], path:[%s], data:[%s], reason:[%s]', host, port, path, JSON.stringify(data), e.message)
    });
  });

  req.write(data);
  req.end();
};
