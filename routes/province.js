var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('province', { title: '省份维护' });
});

module.exports = router;