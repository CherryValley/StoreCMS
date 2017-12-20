var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('administrator', { title: '管理员维护' });
});

module.exports = router;