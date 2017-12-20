var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('country', { title: '国家信息维护' });
});

module.exports = router;