var app = new Vue({
  el: '#app',
  data: {
    sizeID: '',
    sizeNameCN: '',
    sizeNameEN: '',
    saveType: ''
  },
  computed: {
    enabledSave: function () {
      return this.sizeNameCN.length > 0 && this.sizeNameEN.length > 0;
    }
  },
  methods:{
    onAdd: function () {
      app.$data.saveType = 'add';
      app.$data.sizeID = '';
      app.$data.sizeNameCN = '';
      app.$data.sizeNameEN = '';
      $('#myModal').modal('show');
    },
    onChange: function (rowIndex) {
      var row = $('#size-list tbody tr').eq(rowIndex);
      app.$data.sizeID = $(row).find('td').eq(0).text();
      app.$data.sizeNameCN = $(row).find('td').eq(1).text();
      app.$data.sizeNameEN = $(row).find('td').eq(2).text();
      app.$data.saveType = 'change';
      $('#myModal').modal('show');
    },
    onDelete: function (sizeID, sizeName) {
      var confirmMsg = '您确定要删除商品尺码：' + sizeName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/size?sizeID=' + sizeID,
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
          sizeCN: app.$data.sizeNameCN,
          sizeEN: app.$data.sizeNameEN,
          loginUser: getLoginUser()
        };
      }else{
        dataType = 'put';
        saveData = {
          sizeID: app.$data.sizeID,
          sizeCN: app.$data.sizeNameCN,
          sizeEN: app.$data.sizeNameEN,
          loginUser: getLoginUser()
        };
      }
      $.ajax({
        url: '/size',
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