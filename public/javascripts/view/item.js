var app = new Vue({
  el:  '#app',
  methods: {
    onDelete: function (itemID, itemName) {
      var confirmMsg = '您确定要删除商品：' + itemName + '吗？';
      bootbox.confirm(confirmMsg, function(result) {
        if(result) {
          $.ajax({
            url: '/item?itemID=' + itemID,
            type: 'delete',
            dataType: 'json',
            success: function(res){
              if(res.err){
                propAlert(res.msg);
              }else{
                location.reload();
              }
            },
            error: function(XMLHttpRequest){
              propAlert('远程服务无响应');
            }
          });
        }
      });
    }
  }
});