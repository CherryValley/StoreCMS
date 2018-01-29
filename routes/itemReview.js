var express = require('express');
var commonService = require('../service/commonService');
var fs= require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('itemReview', {title: '商品评论'});
});

module.exports = router;