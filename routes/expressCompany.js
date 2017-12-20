var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('expressCompany', { title: '快递公司维护' });
});

module.exports = router;