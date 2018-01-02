var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

router.get('/', function(req, res, next) {
  var service = new commonService.CommonService('city');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getAll(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('city', {
        title: '城市维护',
        totalCount: 0,
        paginationArray:[],
        cityList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '城市维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          cityList: result.content.responseData
        }
      }else{
        if(prePaginationNum > 0 && nextPaginationNum > 0){
          renderData = {
            title: '城市维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            cityList: result.content.responseData
          }
        }else if(prePaginationNum === 0){
          renderData = {
            title: '城市维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            cityList: result.content.responseData
          }
        }else {
          renderData = {
            title: '城市维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            cityList: result.content.responseData
          }
        }
      }

      res.render('city', renderData);
    }
  });
});

router.get('/checkCity', function (req, res, next) {
  var service = new commonService.CommonService('checkCityName');
  var parameter = req.query.cityName;

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
  var service = new commonService.CommonService('city');
  var data = {
    provinceID: req.body.provinceID,
    countryID: req.body.countryID,
    cityNameCN: req.body.cityNameCN,
    cityNameEN: req.body.cityNameEN,
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
  var service = new commonService.CommonService('city');
  var data = {
    cityID: req.body.cityID,
    provinceID: req.body.provinceID,
    countryID: req.body.countryID,
    cityNameCN: req.body.cityNameCN,
    cityNameEN: req.body.cityNameEN,
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
  var service = new commonService.CommonService('city');
  var cityID = req.query.cityID;

  service.delete(cityID, function (result) {
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