var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var service = new commonService.CommonService('item');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getAll(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('item', {
        title: '商品维护',
        totalCount: 0,
        paginationArray:[],
        itemList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '商品维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          itemList: result.content.responseData
        }
      }else{
        if(prePaginationNum > 0 && nextPaginationNum > 0){
          renderData = {
            title: '商品维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            itemList: result.content.responseData
          }
        }else if(prePaginationNum === 0){
          renderData = {
            title: '商品维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            itemList: result.content.responseData
          }
        }else {
          renderData = {
            title: 'item',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            itemList: result.content.responseData
          }
        }
      }

      res.render('item', renderData);
    }
  });
});

module.exports = router;