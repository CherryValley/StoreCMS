var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('category', { title: '一级分类维护' });
});

module.exports = router;