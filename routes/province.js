var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.CommonService('province');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getAll(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('province', {
        title: '省份维护',
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
          title: '省份维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          provinceList: result.content.responseData
        }
      }else{
        if(prePaginationNum > 0 && nextPaginationNum > 0){
          renderData = {
            title: '省份维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            provinceList: result.content.responseData
          }
        }else if(prePaginationNum === 0){
          renderData = {
            title: '省份维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            provinceList: result.content.responseData
          }
        }else {
          renderData = {
            title: '省份维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            provinceList: result.content.responseData
          }
        }
      }

      res.render('province', renderData);
    }
  });
});

router.get('/checkProvince', function (req, res, next) {
  var service = new commonService.CommonService('checkProvinceName');
  var parameter = req.query.provinceName;

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

router.get('/provinceForCountry', function (req, res, next) {
  var service = new commonService.CommonService('provinceForCountry');
  var parameter = req.query.countryID;

  service.get(parameter, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        provinceList: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.CommonService('province');
  var data = {
    countryID: req.body.countryID,
    provinceNameCN: req.body.provinceNameCN,
    provinceNameEN: req.body.provinceNameEN,
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
  var service = new commonService.CommonService('province');
  var data = {
    provinceID: req.body.provinceID,
    countryID: req.body.countryID,
    provinceNameCN: req.body.provinceNameCN,
    provinceNameEN: req.body.provinceNameEN,
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
  var service = new commonService.CommonService('province');
  var provinceID = req.query.provinceID;

  service.delete(provinceID, function (result) {
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