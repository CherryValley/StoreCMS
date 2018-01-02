
var express = require('express');
var fs = require('fs');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var multer = require('multer');
var router = express.Router();
var upload = multer({dest:'public/images/country/'});

router.get('/', function(req, res, next) {
  var service = new commonService.CommonService('country');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getAll(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('country', {
        title: '国家维护',
        totalCount: 0,
        paginationArray:[],
        countryList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '国家维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          countryList: result.content.responseData
        }
      }else{
        if(prePaginationNum > 0 && nextPaginationNum > 0){
          renderData = {
            title: '国家维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            countryList: result.content.responseData
          }
        }else if(prePaginationNum === 0){
          renderData = {
            title: '国家维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            countryList: result.content.responseData
          }
        }else {
          renderData = {
            title: '国家维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            countryList: result.content.responseData
          }
        }
      }
      res.render('country', renderData);
    }
  });
});

router.get('/all', function (req, res, next) {
  var service = new commonService.CommonService('country');

  service.get('', function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: false,
        countryList: result.content.responseData
      });
    }
  });
});

router.get('/checkCountry', function (req, res, next) {
  var service = new commonService.CommonService('checkCountryName');
  var parameter = req.query.countryName;

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
  var service = new commonService.CommonService('country');
  var data = {
    countryNameCN: req.body.countryNameCN,
    countryNameEN: req.body.countryNameEN,
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
  var service = new commonService.CommonService('country');
  var data = {
    countryID: req.body.countryID,
    countryNameCN: req.body.countryNameCN,
    countryNameEN: req.body.countryNameEN,
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
  var service = new commonService.CommonService('country');
  var countryID = req.query.countryID;

  service.delete(countryID, function (result) {
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