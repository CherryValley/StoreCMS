var app = new Vue({
    el: '#app',
    data: {
        companyID: '',
        companyCN: '',
        companyEN: '',
        saveType: ''
    },
    computed: {
        enabledSave: function () {
            return this.companyCN.length > 0 && this.companyEN.length > 0;
        }
    },
    methods:{
        onUpload: function () {
            app.$data.companyID = $(row).find('td').eq(0).text();
            app.$data.companyCN = $(row).find('td').eq(1).text();
            app.$data.companyEN = $(row).find('td').eq(2).text();
        },
        onAdd: function () {
            app.$data.saveType = 'add';
            app.$data.companyID = '';
            app.$data.companyCN = '';
            app.$data.companyEN = '';
            $('#myModal').modal('show');
        },
        onChange: function (rowIndex) {
            var row = $('#expressCompany-list tbody tr').eq(rowIndex);
            app.$data.companyID = $(row).find('td').eq(0).text();
            app.$data.companyCN = $(row).find('td').eq(1).text();
            app.$data.companyEN = $(row).find('td').eq(2).text();
            app.$data.saveType = 'change';
            $('#myModal').modal('show');
        },
        onDelete: function (companyID, companyName) {
            var confirmMsg = '您确定要删除快递公司：' + companyName + '吗？';
            bootbox.confirm(confirmMsg, function(result) {
                if(result) {
                    $.ajax({
                        url: '/expressCompany?companyID=' + companyID,
                        type: 'delete',
                        dataType: 'json',
                        success: function(res){
                            if(res.err){
                                alertMessage(res.msg);
                            }else{
                                location.reload();
                            }
                        },
                        error: function(XMLHttpRequest){
                            alertMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
                        }
                    });
                }
            });
        },
        onSave: function () {
            var dataType = '';
            var saveData = null;
            if(app.$data.saveType === ''){
                return false;
            }
            if(app.$data.saveType === 'add'){
                dataType = 'post';
                saveData = {
                    companyCN: app.$data.companyCN,
                    companyEN: app.$data.companyEN,
                    loginUser: getLoginUser()
                };
            }else{
                dataType = 'put';
                saveData = {
                    companyID: app.$data.companyID,
                    companyCN: app.$data.companyCN,
                    companyEN: app.$data.companyEN,
                    loginUser: getLoginUser()
                };
            }
            $.ajax({
                url: '/expressCompany',
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