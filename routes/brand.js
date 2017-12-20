var express = require('express');
var fs = require('fs');
var brandService = require('../service/brandService');
var multer = require('multer');
var router = express.Router();
var upload = multer({dest:'public/images/brand/'});

/* GET home page. */
router.get('/', function(req, res, next) {
  brandService.getAllBrand(function (result) {
    if(result.err || !result.content.result){
      res.render('brand', { title: '品牌维护', brandList: [] });
    }else{
      res.render('brand', { title: '品牌维护', brandList: result.content.responseData });
    }
  });
});

router.post('/', function (req, res, next) {
  var data = {
    brandCN: req.body.brandCN,
    brandEN: req.body.brandEN,
    loginUser: req.body.loginUser
  };

  brandService.addBrand(data, function (result) {
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