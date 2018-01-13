var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addItem', { title: '添加商品' });
});

module.exports = router;