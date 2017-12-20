var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('itemPromotion', { title: '促销商品维护' });
});

module.exports = router;