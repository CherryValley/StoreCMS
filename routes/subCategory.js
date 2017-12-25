var express = require('express');
var fs = require('fs');
var commonService = require('../service/commonService');
var pagingUtils = require('../common/pagingUtils');
var multer = require('multer');
var router = express.Router();
var upload = multer({dest:'public/images/subCategory/'});

router.get('/', function(req, res, next) {
    var service = new commonService.CommonService('subCategory');
    var pageNumber = req.query.page;
    if(pageNumber === undefined){
        pageNumber = 1;
    }

    service.getAll(pageNumber, function (result) {
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
                if(prePaginationNum === 0){
                    renderData = {
                        title: '商品二级分类维护',
                        totalCount: result.content.totalCount,
                        paginationArray: paginationArray,
                        nextPageNum: nextPaginationNum,
                        currentPageNum: pageNumber,
                        subCategoryList: result.content.responseData
                    }
                }
                if(nextPaginationNum === -1){
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

router.post('/', function (req, res, next) {
    var service = new commonService.CommonService('subCategory');
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
    var service = new commonService.CommonService('subCategory');
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
    var service = new commonService.CommonService('subCategory');
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

router.post('/upload',upload.single('myfile'),function(req,res,next){
    var file=req.file;
    // console.log("名称：%s",file.originalname);
    // console.log("mime：%s",file.mimetype);
    //以下代码得到文件后缀
    var name=file.originalname;
    nameArray=name.split('');
    var nameMime=[];
    l=nameArray.pop();
    nameMime.unshift(l);

    while(nameArray.length!=0&&l!='.'){
        l=nameArray.pop();
        nameMime.unshift(l);
    }
//Mime是文件的后缀
    Mime=nameMime.join('');
    console.log(Mime);
    res.send("done");
//重命名文件 加上文件后缀
    fs.renameSync('./upload/'+file.filename,'./upload/'+file.filename+Mime);

});

module.exports = router;