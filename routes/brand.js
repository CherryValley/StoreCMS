var express = require('express');
var fs = require('fs');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var multer = require('multer');
var router = express.Router();
//var upload = multer({ dest: 'public/images/brand/' });

var storage = multer.diskStorage({
  destination: function (req, file, cb){
    //文件上传成功后会放入public下的upload文件夹
    cb(null, './public/images/brand')
  },
  filename: function (req, file, cb){
    //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
    cb(null, file.originalname)
  }
});
var upload = multer({
  storage: storage
});

router.get('/', function(req, res, next) {
  var service = new commonService.CommonService('brand');
  var pageNumber = req.query.page;
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  service.getAll(pageNumber, function (result) {
    if(result.err || !result.content.result){
      res.render('brand', {
        title: '品牌维护',
        totalCount: 0,
        paginationArray:[],
        brandList: []
      });
    }else{
      var paginationArray = pagingUtils.getPaginationArray(pageNumber, result.content.totalCount);
      var prePaginationNum = pagingUtils.getPrePaginationNum(pageNumber);
      var nextPaginationNum = pagingUtils.getNextPaginationNum(pageNumber, result.content.totalCount);
      var renderData = {};
      if(result.content.responseData === null){
        renderData = {
          title: '品牌维护',
          totalCount: result.content.totalCount,
          currentPageNum: pageNumber,
          brandList: result.content.responseData
        }
      }else{
        if(prePaginationNum > 0 && nextPaginationNum > 0){
          renderData = {
            title: '品牌维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            brandList: result.content.responseData
          }
        }else if(prePaginationNum === 0){
          renderData = {
            title: '品牌维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            nextPageNum: nextPaginationNum,
            currentPageNum: pageNumber,
            brandList: result.content.responseData
          }
        }else {
          renderData = {
            title: '品牌维护',
            totalCount: result.content.totalCount,
            paginationArray: paginationArray,
            prePageNum: prePaginationNum,
            currentPageNum: pageNumber,
            brandList: result.content.responseData
          }
        }
      }

      res.render('brand', renderData);
    }
  });
});

router.get('/checkBrand', function (req, res, next) {
  var service = new commonService.CommonService('checkBrandName');
  var parameter = req.query.brandName;

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
  var service = new commonService.CommonService('brand');
  var data = {
    brandCN: req.body.brandCN,
    brandEN: req.body.brandEN,
    brandImageUrl: req.body.brandImageUrl,
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
  var service = new commonService.CommonService('brand');
  var data = {
    brandID: req.body.brandID,
    brandCN: req.body.brandCN,
    brandEN: req.body.brandEN,
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
  var service = new commonService.CommonService('brand');
  var brandID = req.query.brandID;

  service.delete(brandID, function (result) {
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

router.post('/imageUpload',  upload.single('file'), function(req,res,next){
//拼接文件上传后的网络路径，
  var url = 'http://' + req.headers.host + '/images/brand/' + req.file.originalname;
  //将其发回客户端
  res.json({
    err : false,
    imageUrl : url
  });
  res.end();

});

module.exports = router;