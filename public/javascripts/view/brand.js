var app = new Vue({
  el: '#app',
  data: {
    brandID: '',
    brandNameCN: '',
    brandNameEN: '',
    brandImageUrl: '3',
    brandNameCNValid: false,
    brandNameENValid: false,
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.brandNameCN.length > 0
          && this.brandNameEN.length > 0
          && this.brandImageUrl.length > 0
          && this.brandNameCNValid > 0
          && this.brandNameENValid > 0;
    }
  },
  methods:{
    checkBrandName: function (brandName, lan) {
      if($.trim(brandName).length === 0){
        return false;
      }
      $.ajax({
        url: '/brand/checkBrand?brandName='+brandName,
        type: 'GET',
        success: function(res){
          if(res.err){
            lan === 'CN' ? app.$data.brandNameCNValid = false : app.$data.brandNameENValid = false;
            showMessage(res.msg);
          }else if(res.exist){
            lan === 'CN' ? app.$data.brandNameCNValid = false : app.$data.brandNameENValid = false;
            showMessage(brandName + '已存在。');
          }else{
            lan === 'CN' ? app.$data.brandNameCNValid = true : app.$data.brandNameENValid = true;
            hiddenMessage();
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onUpload: function () {
      app.$data.brandID = $(row).find('td').eq(0).text();
      app.$data.brandNameCN = $(row).find('td').eq(1).text();
      app.$data.brandNameEN = $(row).find('td').eq(2).text();
    },
    onAdd: function () {
      app.$data.saveType = 'add';
      app.$data.brandID = '';
      app.$data.brandNameCN = '';
      app.$data.brandNameEN = '';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#brand-list tbody tr').eq(rowIndex);
      app.$data.brandID = $(row).find('td').eq(0).text();
      app.$data.brandNameCN = $(row).find('td').eq(1).text();
      app.$data.brandNameEN = $(row).find('td').eq(2).text();
      app.$data.saveType = 'change';
      hiddenMessage();
      $('#myModal').modal('show');
    },
    onDelete: function (brandID, brandName) {
      var confirmMsg = '您确定要删除品牌：' + brandName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/brand?brandID=' + brandID,
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
    onBrandCNBlur: function () {
      app.checkBrandName(app.$data.brandNameCN, 'CN');
    },
    onBrandENBlur: function () {
      app.checkBrandName(app.$data.brandNameEN, 'EN');
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
          brandCN: app.$data.brandNameCN,
          brandEN: app.$data.brandNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          brandID: app.$data.brandID,
          brandCN: app.$data.brandNameCN,
          brandEN: app.$data.brandNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/brand',
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