var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('wholesaler', { title: '批发商管理' });
});

module.exports = router;