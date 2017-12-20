var app = new Vue({
  el: '#app',
  data: {
    brandNameCN: '',
    brandNameEN: '',
    brandImageUrl: '3'
  },
  computed: {
    enabledSave: function () {
      return this.brandNameCN.length > 0 && this.brandNameEN.length > 0 && this.brandImageUrl.length > 0;
    }
  },
  methods:{
    onUpload: function () {

    },
    onSave: function () {
      $.ajax({
        url: '/brand',
        type: 'post',
        dataType: 'json',
        data:{
          brandCN: app.$data.brandNameCN,
          brandEN: app.$data.brandNameEN,
          loginUser: 'johnny'
        },
        success: function(res){
          if(res.err){
            showAlert(res.msg);
          }else{
            location.reload();
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
          // alert(XMLHttpRequest.status);
          // alert(XMLHttpRequest.readyState);
          // alert(textStatus);
        }
      });
    }
  }
});