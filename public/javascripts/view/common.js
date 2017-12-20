$(document).ready(function () {
  setAlertBell();
  setActiveNav();
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

function showAlert(msg) {
  $('.store-alert').removeClass('hidden');
  $('.store-alert span').text(msg);
}

function showPopover(element, msg) {
  $(element).popover(options)
}