$(document).ready(function () {
  setAlertBell();
  setActiveNav();
  setPaginationStatus();
});

function setAlertBell() {
  var alertCount = 8;
  if(alertCount > 0){
    $('.icon-bell-alt').addClass('icon-animated-bell');
  }
}

function setActiveNav() {
  var pathname = window.location.pathname;
  $('.nav-list li.active').removeClass('active');
  $('.nav-list li.open').removeClass('open').removeClass('active');
  var element = $('.nav-list a[href="' + pathname + '"]');
  $(element).parent().addClass('active');
  $(element).parent().parent().parent().addClass('open active');
}

function alertMessage(msg) {
  var html = '<div class="modal fade" tabindex="-1" role="dialog" id="dialog-alert-message">\n' +
      '  <div class="modal-dialog" role="document">\n' +
      '    <div class="modal-content">\n' +
      '      <div class="modal-header">\n' +
      '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
      '        <h4 class="modal-title">系统提示</h4>\n' +
      '      </div>\n' +
      '      <div class="modal-body">\n' +
      '        <p>' + msg + '</p>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</div>';

  var dialog = $('#dialog-alert-message');
  if(dialog.length === 0){
    $('.page-content').after(html);
  }

  $('#dialog-alert-message').modal('show');

}

function showMessage(msg) {
  $('.alert-warning').removeClass('hidden');
  $('.alert-warning span:last').text(msg);
}

function setPaginationStatus() {
  var currentPageNum = $('#hidden-currentPageNum').val();
  if(currentPageNum !== undefined){
    //设置默认选中的页码
    $('ul.pagination li').each(function () {
      if($(this).text() === currentPageNum){
        $(this).addClass('active');
      }
    });

    //设置前一页按钮是否可用
    var firstPageNumber = $('ul.pagination li').eq(1).text();
    if(currentPageNum === firstPageNumber){
      $('ul.pagination li').eq(0).addClass('disabled');
    }

    //设置后一页按钮是否可用
    var lastPageNumber = $('ul.pagination li').eq($('ul.pagination li').length - 2).text();
    if(currentPageNum === lastPageNumber){
      $('ul.pagination li').eq($('ul.pagination li').length - 1).addClass('disabled');
    }
  }
}

function getLoginUser() {
  return 'johnny';
}