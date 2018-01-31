var app = new Vue({
    el: '#app',
    data: {
        reviewID: '',
        itemID: '',
        customerID: '',
        customerName: '',
        itemShortDescriptionCN: '',
        itemShortDescriptionEN: '',
        cellphone: '',
        itemCode: '',
        reviewText: '',
        reviewStatus: '',
        reviewLevel: '',
        selectedReviewStatus: '',
        selectedReviewLevel: '',
        reviewStatusText: '',
        reviewLevelText: '',
        itemName: '',
        // itemValid: false,
        saveType: ''
    },
    // computed: {
    //     enabledSave: function () {
    //         return this.itemID.length > 0
    //             && this.customerID.length > 0
    //             && this.selectedStatus.length > 0
    //             && this.shoppingCount.length > 0;
    //             // && this.brandValid;
    //     }
    // },
    methods:{
        onSearch: function () {
            hiddenMessage();
            $('#myModal').modal('show');
        },
        onCustomerIDBlur: function () {
            // if($.trim(this.customerID).length === 0){
            //     return false;
            // }
            // $.ajax({
            //     url: '/customer/detail?customerID=' + this.customerID,
            //     type: 'get',
            //     success: function(res){
            //         if(res.err){
            //             showMessage(res.msg);
            //         }else{
            //             hiddenMessage();
            //             if(res.data === null){
            //                 app.$data.customerValid = false;
            //                 app.$data.customerName = '';
            //                 showMessage('客户不存在。');
            //                 return false;
            //             }
            //             app.$data.customerName = res.data.customerName;
            //             app.$data.customerValid = true;
            //         }
            //     },
            //     error: function(XMLHttpRequest){
            //         showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
            //     }
            // });

        },
        onChange: function (reviewID,status) {
            app.$data.reviewID = reviewID;
            app.$data.reviewStatus = status;
            var dataType = 'put';
            saveData = {
                reviewID: app.$data.reviewID,
                reviewStatus: app.$data.reviewStatus,
                loginUser: getLoginUser()
            };
            $.ajax({
                url: '/itemReview',
                type: dataType,
                dataType: 'json',
                data:saveData,
                success: function(res){
                    if(res.err){
                        showMessage(res.msg);
                    }else{
                        location.reload();
                    }
                },
                error: function(XMLHttpRequest, textStatus){
                    showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
                }
            });
        }
    }
});