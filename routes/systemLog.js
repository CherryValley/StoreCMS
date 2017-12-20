var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('systemLog', { title: '系统日志信息' });
});

module.exports = router;