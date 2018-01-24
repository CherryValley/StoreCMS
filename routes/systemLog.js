var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('systemLog');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('province', {
        title: '系统日志信息',
        totalCount: 0,
        paginationArray:[],
        provinceList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '系统日志信息',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          systemLogList: result.content.responseData
        }
      }else{
        if(prePaginationNum > 0 && nextPaginationNum > 0){
          renderData = {
            title: '系统日志信息',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            systemLogList: result.content.responseData
          }
        }else if(prePaginationNum === 0){
          renderData = {
            title: '系统日志信息',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            systemLogList: result.content.responseData
          }
        }else {
          renderData = {
            title: '系统日志信息',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            systemLogList: result.content.responseData
          }
        }
      }

      res.render('systemLog', renderData);
    }
  });
});

router.put('/', function(req,res,next){
  var service = new commonService.commonInvoke('systemLog');
  var data = {
    logID: req.body.logID,
    status: req.body.status,
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

module.exports = router;