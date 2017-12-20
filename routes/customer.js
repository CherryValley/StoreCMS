var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('customer', { title: '注册客户信息' });
});

module.exports = router;