var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shoppingCart', { title: '购物车信息' });
});

module.exports = router;