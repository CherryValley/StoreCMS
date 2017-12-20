var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('itemHot', { title: '热销商品维护' });
});

module.exports = router;