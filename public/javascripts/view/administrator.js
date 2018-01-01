var app = new Vue({
    el: '#app',
    data: {
        administratorList:[],
        administratorID: '',
        administratorName: '',
        selectedCustomerRole:'',
        selectedStatus:'',
        account: '',
        cellphone: '',
        email: '',
        customerRoleList: [
            {'key': 'S','value':'最高权限'},
            {'key': 'C','value':'修改权限'},
            {'key': 'Q','value':'查询权限'}
            ],
        statusList: [
            {'key': 'P','value':'待审核'},
            {'key': 'A','value':'审核通过'},
            {'key': 'N','value':'审核未通过'},
            {'key': 'F','value':'冻结'}
        ],
        administratorNameValid: false,
        saveType: ''
    },
    computed: {
        enabledSave: function () {
            if(typeof (this.selectedCustomerRole) === 'string' && typeof (this.selectedStatus) === 'string'){
                return this.selectedCustomerRole.length > 0
                    && this.selectedStatus.length > 0
                    && this.administratorName.length > 0
                    && this.administratorNameValid;
            }else{
                return this.selectedCustomerRole > 0
                    && this.selectedStatus > 0
                    && this.administratorName.length > 0
                    && this.administratorNameValid;
            }
        }
    },
    methods:{
        checkAdministratorName: function (administratorName, lan) {
            if($.trim(administratorName).length === 0){
                return false;
            }
            $.ajax({
                url: '/administrator/checkAdministrator?administratorName='+administratorName,
                type: 'GET',
                success: function(res){
                    if(res.err){
                        lan === 'CN' ? app.$data.administratorNameValid = false : app.$data.administratorNameENValid = false;
                        showMessage(res.msg);
                    }else if(res.exist){
                        lan === 'CN' ? app.$data.administratorNameCNValid = false : app.$data.administratorNameENValid = false;
                        showMessage(lan === 'CN' ? '省份中文已存在。' : '省份英文已存在。');
                    }else{
                        lan === 'CN' ? app.$data.administratorNameCNValid = true : app.$data.administratorNameENValid = true;
                        hiddenMessage();
                    }
                },
                error: function(XMLHttpRequest, textStatus){
                    showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
                }
            });
        },
        onChange: function (rowIndex) {
            var row = $('#administrator-list tbody tr').eq(rowIndex);
            app.$data.administratorID = $(row).find('td').eq(0).text();
            app.$data.administratorName = $(row).find('td').eq(1).text();
            app.$data.account = $(row).find('td').eq(2).text();
            app.$data.cellphone = $(row).find('td').eq(3).text();
            app.$data.email = $(row).find('td').eq(4).text();
            // app.$data.selectedCustomerRole = $(row).find('td').eq(5).find('input').val();
            app.$data.selectedCustomerRole = $(row).find('td').eq(5).text();
            app.$data.selectedStatus = $(row).find('td').eq(6).text();
            // app.$data.selectedStatus = $(row).find('td').eq(6).find('input').val();
            app.$data.saveType = 'change';
            hiddenMessage();
            $('#myModal').modal('show');
        },
        onDelete: function (administratorID, administratorName) {
            var confirmMsg = '您确定要删除' + administratorName + '吗？';
            bootbox.confirm(confirmMsg, function(result) {
                if(result) {
                    $.ajax({
                        url: '/administrator?administratorID=' + administratorID,
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
        // matchCustomerRole: function (selectedCustomerRole) {
        //     switch(selectedCustomerRole){
        //         case "":
        //             selectedCustomerRole = "请选择状态";
        //             $().
        //             break;
        //         case "修改权限":
        //             selectedCustomerRole = "修改权限";
        //             break;
        //         case "最高权限":
        //             selectedCustomerRole = "最高权限";
        //             break;
        //         case "查询权限":
        //
        //             break;
        //     }
        // },
        // onadministratorBlur: function () {
        //     app.checkAdministratorName(app.$data.administratorName, 'CN');
        // },
        onSave: function () {
            var dataType = '';
            var saveData = null;
            if(app.$data.saveType === ''){
                return false;
            }
            if(app.$data.saveType === 'add'){
                dataType = 'post';
                saveData = {
                    administratorID: app.$data.selectedAdministrator,
                    administratorName: app.$data.administratorName,
                    loginUser: getLoginUser()
                };
            }else{
                dataType = 'put';
                saveData = {
                    administratorID: app.$data.administratorID,
                    administratorName: app.$data.administratorName,
                    loginUser: getLoginUser()
                };
            }
            $.ajax({
                url: '/administrator',
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
    },
    mounted: function () {
        $.ajax({
            url: '/administrator/administratorList',
            type: 'GET',
            success: function(res){
                if(res.err){
                    alertMessage(res.msg);
                    //showMessage(res.msg);
                }else{
                    app.$data.administratorList = res.administratorList
                }
            },
            error: function(XMLHttpRequest, textStatus){
                showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
            }
        });

        // customerRoleList
        //  $.ajax({
        //             url: '/administrator/customerRoleList',
        //             type: 'GET',
        //             success: function(res){
        //                 if(res.err){
        //                     alertMessage(res.msg);
        //                     //showMessage(res.msg);
        //                 }else{
        //                     app.$data.administratorList = res.administratorList
        //                 }
        //             },
        //             error: function(XMLHttpRequest, textStatus){
        //                 showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        //             }
        //         });

        // statusList
        // $.ajax({
        //     url: '/administrator/statusList',
        //     type: 'GET',
        //     success: function(res){
        //         if(res.err){
        //             alertMessage(res.msg);
        //             //showMessage(res.msg);
        //         }else{
        //             app.$data.administratorList = res.administratorList
        //         }
        //     },
        //     error: function(XMLHttpRequest, textStatus){
        //         showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        //     }
        // });
    }
});