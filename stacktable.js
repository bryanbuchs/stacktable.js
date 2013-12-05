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
;(function($) {

  $.fn.stacktable = function(options) {
    var $tables = this,
        defaults = {
          classname: 'stacktable',
          hideOriginal: false,
          title: 'st-title',
          key: 'st-key',
          val: 'st-val'
        },
        settings = $.extend({}, defaults, options);

    return $tables.each(function() {
      var $stacktable = $('<table class="' + settings.classname + '"></table>'),
          markup = '',
          $table = $(this),
          $topRow = $table.find('tr').eq(0);
      $table.find('tr').each(function(index) {
        // for the first row, top left table cell is the head ("title") of the table
        if (index===0) {
          markup += '<thead><tr><th class="' + settings.title + '" colspan="2">'+$(this).find('th,td').eq(0).html()+'</th></tr></thead>';
        }
        // for the other rows, put the left table cell as the head for that row
        // then iterate through the key/values
        else {
          markup += '<tbody>';
          $(this).find('td').each(function(index) {
            if (index===0) {
              markup += '<tr><td colspan="2">' + $(this).html() + '</td></tr>';
            } else {
              if ($(this).html() !== ''){
                markup += '<tr>';
                if ($topRow.find('td,th').eq(index).html()){
                  markup += '<td class="' + settings.key +'">' + $topRow.find('td,th').eq(index).html() + '</td>';
                } else {
                  markup += '<td class="' + settings.key + '"></td>';
                }
                markup += '<td class="'+ settings.val +'">' + $(this).html() + '</td>';
                markup += '</tr>';
              }
            }
          });
          markup += '</tbody>';
        }
      });
    $stacktable.append($(markup));
    $table.before($stacktable);
    if (settings.hideOriginal) {
      $table.hide();
    }
  });
};

}(jQuery));
