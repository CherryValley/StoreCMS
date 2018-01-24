var express = require('express');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var router = express.Router();

router.get('/', function(req, res, next) {
    var service = new commonService.commonInvoke('category');
    var pageNumber = req.query.page;
    if(pageNumber === undefined){
        pageNumber = 1;
    }

    service.getPageData(pageNumber, function (result) {
        if(result.err || !result.content.result){
            res.render('category', {
                title: '商品一级分类维护',
                totalCount: 0,
                paginationArray:[],
                categoryList: []
            });
        }else{
            var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
            var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
            var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
            var renderData = {};
            if(result.content.responseData === null){
                renderData = {
                    title: '商品一级分类维护',
                    totalCount: result.content.totalCount,
                    currentPageNum: pageNumber,
                    categoryList: result.content.responseData
                }
            }else{
                if(prePaginationNum > 0 && nextPaginationNum > 0){
                    renderData = {
                        title: '商品一级分类维护',
                        totalCount: result.content.totalCount,
                        paginationArray: paginationArray,
                        prePageNum: prePaginationNum,
                        nextPageNum: nextPaginationNum,
                        currentPageNum: pageNumber,
                        categoryList: result.content.responseData
                    }
                }else if(prePaginationNum === 0){
                    renderData = {
                        title: '商品一级分类维护',
                        totalCount: result.content.totalCount,
                        paginationArray: paginationArray,
                        nextPageNum: nextPaginationNum,
                        currentPageNum: pageNumber,
                        categoryList: result.content.responseData
                    }
                }else {
                    renderData = {
                        title: '商品一级分类维护',
                        totalCount: result.content.totalCount,
                        paginationArray: paginationArray,
                        prePageNum: prePaginationNum,
                        currentPageNum: pageNumber,
                        categoryList: result.content.responseData
                    }
                }
            }
            res.render('category', renderData);
        }
    });
});

router.get('/all', function (req, res, next) {
  var service = new commonService.commonInvoke('category');

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
        categoryList: result.content.responseData
      });
    }
  });
});

router.get('/checkCategory', function (req, res, next) {
  var service = new commonService.commonInvoke('checkCategoryName');
  var parameter = req.query.categoryName;

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
    var service = new commonService.commonInvoke('category');
    var data = {
        categoryCN: req.body.categoryCN,
        categoryEN: req.body.categoryEN,
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
    var service = new commonService.commonInvoke('category');
    var data = {
        categoryID: req.body.categoryID,
        categoryCN: req.body.categoryCN,
        categoryEN: req.body.categoryEN,
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
    var service = new commonService.commonInvoke('category');
    var categoryID = req.query.categoryID;

    service.delete(categoryID, function (result) {
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