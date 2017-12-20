var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('brandHot', { title: '热销品牌维护' });
});

module.exports = router;