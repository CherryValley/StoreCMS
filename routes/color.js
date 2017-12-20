var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('color', { title: '商品颜色维护' });
});

module.exports = router;