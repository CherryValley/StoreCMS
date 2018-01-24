var express = require('express');
var fs = require('fs');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

router.get('/', function(req, res, next) {
    var service = new commonService.commonInvoke('subCategory');
    var pageNumber = req.query.page;
    if(pageNumber === undefined){
        pageNumber = 1;
    }

    service.getPageData(pageNumber, function (result) {
        if(result.err || !result.content.result){
            res.render('subCategory', {
                title: '商品二级分类维护',
                totalCount: 0,
                paginationArray:[],
                subCategoryList: []
            });
        }else{
            var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
            var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
            var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
            var renderData = {};
            if(result.content.responseData === null){
                renderData = {
                    title: '商品二级分类维护',
                    totalCount: result.content.totalCount,
                    currentPageNum: pageNumber,
                    subCategoryList: result.content.responseData
                }
            }else{
                if(prePaginationNum > 0 && nextPaginationNum > 0){
                    renderData = {
                        title: '商品二级分类维护',
                        totalCount: result.content.totalCount,
                        paginationArray: paginationArray,
                        prePageNum: prePaginationNum,
                        nextPageNum: nextPaginationNum,
                        currentPageNum: pageNumber,
                        subCategoryList: result.content.responseData
                    }
                }else if(prePaginationNum === 0){
                    renderData = {
                        title: '商品二级分类维护',
                        totalCount: result.content.totalCount,
                        paginationArray: paginationArray,
                        nextPageNum: nextPaginationNum,
                        currentPageNum: pageNumber,
                        subCategoryList: result.content.responseData
                    }
                }else {
                    renderData = {
                        title: '商品二级分类维护',
                        totalCount: result.content.totalCount,
                        paginationArray: paginationArray,
                        prePageNum: prePaginationNum,
                        currentPageNum: pageNumber,
                        subCategoryList: result.content.responseData
                    }
                }
            }

            res.render('subCategory', renderData);
        }
    });
});

router.get('/all', function (req, res, next) {
  var service = new commonService.commonInvoke('subCategory');

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
        subCategoryList: result.content.responseData
      });
    }
  });
});

router.get('/checkSubCategory', function (req, res, next) {
  var service = new commonService.commonInvoke('checkSubCategoryName');
  var parameter = req.query.subCategoryName;

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
    var service = new commonService.commonInvoke('subCategory');
    var data = {
        subCategoryCN: req.body.subCategoryCN,
        subCategoryEN: req.body.subCategoryEN,
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
    var service = new commonService.commonInvoke('subCategory');
    var data = {
        subCategoryID: req.body.subCategoryID,
        subCategoryCN: req.body.subCategoryCN,
        subCategoryEN: req.body.subCategoryEN,
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
    var service = new commonService.commonInvoke('subCategory');
    var subCategoryID = req.query.subCategoryID;

    service.delete(subCategoryID, function (result) {
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