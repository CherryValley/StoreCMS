var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var service = new commonService.CommonService('itemSeries');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getAll(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('itemSeries', {
        title: '商品系列维护',
        totalCount: 0,
        paginationArray:[],
        itemSeriesList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '商品系列维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          itemSeriesList: result.content.responseData
        }
      }else{
        if(prePaginationNum === 0){
          renderData = {
            title: '商品系列维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            itemSeriesList: result.content.responseData
          }
        }
        if(nextPaginationNum === -1){
          renderData = {
            title: '商品系列维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            itemSeriesList: result.content.responseData
          }
        }
      }

      res.render('itemSeries', renderData);
    }
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.CommonService('itemSeries');
  var data = {
    itemSeriesCN: req.body.itemSeriesCN,
    itemSeriesEN: req.body.itemSeriesEN,
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
  var service = new commonService.CommonService('itemSeries');
  var data = {
    seriesID: req.body.seriesID,
    itemSeriesCN: req.body.itemSeriesCN,
    itemSeriesEN: req.body.itemSeriesEN,
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
  var service = new commonService.CommonService('itemSeries');
  var seriesID = req.query.seriesID;

  service.delete(seriesID, function (result) {
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