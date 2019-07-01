 $(function ($) {
  $.getScript('./smartlid/smartlid.js', function () {
    $('body').smartLid({
      autoOpenForm: false,
      callForm: true,
      isSmartlidVisible: 'smartlid_hidden',
      callFormAddFile: false,
      callFormTitle: 'Оставьте ваш номер телефона, и наш консультант свяжется с вами',
    });
  });

  function addStyle(href) {
    elem = document.createElement("link");
    elem.href = href;
    elem.rel = 'stylesheet';
    document.head.appendChild(elem);
  }
  addStyle('./smartlid/css/main.css');
}(jQuery));