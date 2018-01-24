var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.commonInvoke('expressCompany');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getPageData(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('expressCompany', {
        title: '快递公司维护',
        totalCount: 0,
        paginationArray:[],
        expressCompanyList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '快递公司维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          expressCompanyList: result.content.responseData
        }
      }else{
        if(prePaginationNum > 0 && nextPaginationNum > 0){
          renderData = {
            title: '快递公司维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            expressCompanyList: result.content.responseData
          }
        }else if(prePaginationNum === 0){
          renderData = {
            title: '快递公司维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            expressCompanyList: result.content.responseData
          }
        }else {
          renderData = {
            title: '快递公司维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            expressCompanyList: result.content.responseData
          }
        }
      }

      res.render('expressCompany', renderData);
    }
  });
});

router.get('/checkCompany', function (req, res, next) {
  var service = new commonService.commonInvoke('checkCompanyName');
  var parameter = req.query.companyName;

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
  var service = new commonService.commonInvoke('expressCompany');
  var data = {
    companyCN: req.body.companyCN,
    companyEN: req.body.companyEN,
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
  var service = new commonService.commonInvoke('expressCompany');
  var data = {
    companyID: req.body.companyID,
    companyCN: req.body.companyCN,
    companyEN: req.body.companyEN,
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
  var service = new commonService.commonInvoke('expressCompany');
  var companyID = req.query.companyID;

  service.delete(companyID, function (result) {
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