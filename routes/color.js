var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var service = new commonService.CommonService('color');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getAll(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('color', {
        title: '商品颜色维护',
        totalCount: 0,
        paginationArray:[],
        colorList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '商品颜色维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          colorList: result.content.responseData
        }
      }else{
        if(prePaginationNum === 0){
          renderData = {
            title: '商品颜色维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            colorList: result.content.responseData
          }
        }
        if(nextPaginationNum === -1){
          renderData = {
            title: '商品颜色维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            colorList: result.content.responseData
          }
        }
      }

      res.render('color', renderData);
    }
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.CommonService('color');
  var data = {
    colorCN: req.body.colorCN,
    colorEN: req.body.colorEN,
    loginUser: req.body.loginUser
  };

  service.add(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        data: result.content
      });
    }
  });
});

router.put('/', function(req,res,next){
  var service = new commonService.CommonService('color');
  var data = {
    colorID: req.body.colorID,
    colorCN: req.body.colorCN,
    colorEN: req.body.colorEN,
    loginUser: req.body.loginUser
  };

  service.change(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        data: result.content
      });
    }
  });
});

router.delete('/', function (req, res, next) {
  var service = new commonService.CommonService('color');
  var colorID = req.query.colorID;

  service.delete(colorID, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        data: result.content
      });
    }
  });
});

module.exports = router;