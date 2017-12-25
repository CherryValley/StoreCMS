var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var service = new commonService.CommonService('material');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getAll(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('material', {
        title: '商品材质维护',
        totalCount: 0,
        paginationArray:[],
        materialList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '商品材质维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          materialList: result.content.responseData
        }
      }else{
        if(prePaginationNum === 0){
          renderData = {
            title: '商品材质维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            materialList: result.content.responseData
          }
        }
        if(nextPaginationNum === -1){
          renderData = {
            title: '商品材质维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            materialList: result.content.responseData
          }
        }
      }

      res.render('material', renderData);
    }
  });
});

router.post('/', function (req, res, next) {
  var service = new commonService.CommonService('material');
  var data = {
    materialCN: req.body.materialCN,
    materialEN: req.body.materialEN,
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
  var service = new commonService.CommonService('material');
  var data = {
    materialID: req.body.materialID,
    materialCN: req.body.materialCN,
    materialEN: req.body.materialEN,
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
  var service = new commonService.CommonService('material');
  var materialID = req.query.materialID;

  service.delete(materialID, function (result) {
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