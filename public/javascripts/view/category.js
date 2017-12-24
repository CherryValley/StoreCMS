var app = new Vue({
    el: '#app',
    data: {
        categoryID: '',
        categoryNameCN: '',
        categoryNameEN: '',
        categoryImageUrl: '3',
        saveType: ''
    },
    computed: {
        enabledSave: function () {
            return this.categoryNameCN.length > 0 && this.categoryNameEN.length > 0 && this.categoryImageUrl.length > 0;
        }
    },
    methods:{
        onUpload: function () {
            app.$data.categoryID = $(row).find('td').eq(0).text();
            app.$data.categoryNameCN = $(row).find('td').eq(1).text();
            app.$data.categoryNameEN = $(row).find('td').eq(2).text();
        },
        onAdd: function () {
            app.$data.saveType = 'add';
            app.$data.categoryID = '';
            app.$data.categoryNameCN = '';
            app.$data.categoryNameEN = '';
            $('#myModal').modal('show');
        },
        onChange: function (rowIndex) {
            var row = $('#category-list tbody tr').eq(rowIndex);
            app.$data.categoryID = $(row).find('td').eq(0).text();
            app.$data.categoryNameCN = $(row).find('td').eq(1).text();
            app.$data.categoryNameEN = $(row).find('td').eq(2).text();
            app.$data.saveType = 'change';
            $('#myModal').modal('show');
        },
        onDelete: function (categoryID, categoryName) {
            var confirmMsg = '您确定要删除商品一级分类：' + categoryName + '吗？';
            bootbox.confirm(confirmMsg, function(result) {
                if(result) {
                    $.ajax({
                        url: '/category?categoryID=' + categoryID,
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
                    categoryCN: app.$data.categoryNameCN,
                    categoryEN: app.$data.categoryNameEN,
                    loginUser: getLoginUser()
                };
            }else{
                dataType = 'put';
                saveData = {
                    categoryID: app.$data.categoryID,
                    categoryCN: app.$data.categoryNameCN,
                    categoryEN: app.$data.categoryNameEN,
                    loginUser: getLoginUser()
                };
            }
            $.ajax({
                url: '/category',
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