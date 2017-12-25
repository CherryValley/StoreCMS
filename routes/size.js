var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var service = new commonService.CommonService('size');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getAll(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('size', {
        title: '商品尺码维护',
        totalCount: 0,
        paginationArray:[],
        sizeList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '商品尺码维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          sizeList: result.content.responseData
        }
      }else{
        if(prePaginationNum === 0){
          renderData = {
            title: '商品尺码维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            sizeList: result.content.responseData
          }
        }
        if(nextPaginationNum === -1){
          renderData = {
            title: '商品尺码维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            sizeList: result.content.responseData
          }
        }
      }

      res.render('size', renderData);
    }
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.CommonService('size');
  var data = {
    sizeCN: req.body.sizeCN,
    sizeEN: req.body.sizeEN,
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
  var service = new commonService.CommonService('size');
  var data = {
    sizeID: req.body.sizeID,
    sizeCN: req.body.sizeCN,
    sizeEN: req.body.sizeEN,
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
  var service = new commonService.CommonService('size');
  var sizeID = req.query.sizeID;

  service.delete(sizeID, function (result) {
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