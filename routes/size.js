var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('size');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
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
          if(prePaginationNum > 0 && nextPaginationNum > 0){
              renderData = {
                  title: '商品尺码维护',
                  totalCount: result.content.totalCount,
                  paginationArray: paginationArray,
                  prePageNum: prePaginationNum,
                  nextPageNum: nextPaginationNum,
                  currentPageNum: pageNumber,
                  sizeList: result.content.responseData
              }
          }else if(prePaginationNum === 0){
              renderData = {
                  title: '商品尺码维护',
                  totalCount: result.content.totalCount,
                  paginationArray: paginationArray,
                  nextPageNum: nextPaginationNum,
                  currentPageNum: pageNumber,
                  sizeList: result.content.responseData
              }
          }else {
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

router.get('/all', function (req, res, next) {
  var service = new commonService.commonInvoke('size');

  service.getAll(function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        sizeList: result.content.responseData
      });
    }
  });
});

router.get('/checkSize', function (req, res, next) {
  var service = new commonService.commonInvoke('checkSizeName');
  var parameter = req.query.sizeName;

  service.get(parameter, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        msg: result.content.responseMessage,
        exist: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.commonInvoke('size');
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
  var service = new commonService.commonInvoke('size');
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
  var service = new commonService.commonInvoke('size');
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