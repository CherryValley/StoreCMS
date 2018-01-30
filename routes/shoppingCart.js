var express = require('express');
var commonService = require('../service/commonService');
var router = express.Router();

router.get('/', function(req, res, next) {
    var service = new commonService.commonInvoke('shoppingCart');
    var pageNumber = req.query.page;
    if(pageNumber === undefined){
        pageNumber = 1;
    }

    service.getPageData(pageNumber, function (result) {
        var renderData = commonService.buildRenderData('购物车', pageNumber, result);
        res.render('shoppingCart', renderData);
    });
});

router.post('/', function (req, res, next) {
    var service = new commonService.commonInvoke('shoppingCart');
    var data = {
        customerID: req.body.customerID,
        status: req.body.status
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


module.exports = router;