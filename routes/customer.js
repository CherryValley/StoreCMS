var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('customer', { title: '注册客户信息' });
});

router.get('/detail', function(req, res, next) {
  var service = new commonService.commonInvoke('customer');
  var customerID = req.query.customerID;

  service.get(customerID, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  });
});

module.exports = router;