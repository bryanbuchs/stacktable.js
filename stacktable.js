/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 *
 */
(function ($) {

  $.fn.stacktable = function (options) {
    var $tables = this,
      defaults = {
        classname: 'stacktable'
      },
      settings = $.extend({}, defaults, options);

    return $tables.each(function () {

      var $stacktable = $('<table class="' + settings.classname + '"></table>'),
        markup = '',
        $table = $(this),
        $headers = $table.find('thead').eq(0).children().eq(0);

        if ($headers.length) {

          $table.find('tbody').children().each(function (index) {
            markup += '<tbody>';
            $(this).children().each(function (index) {
              if ($(this).html() !== '') {
                markup += '<tr>';
                markup += '<th>' + $headers.children().eq(index).text() + '</th>';
                markup += '<td>' + $(this).html() + '</td>';
                markup += '</tr>';
              }
            });
            markup += '</tbody>';
          });

          $stacktable.append($(markup));
          $table.addClass('is-' + settings.classname).before($stacktable);

        }

    });
  };

}(jQuery));
