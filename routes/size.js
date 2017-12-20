var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('size', { title: '商品尺码维护' });
});

module.exports = router;