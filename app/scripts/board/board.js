/*jshint browser: true*/

define([
    'text!./board.html'
  ],
  function(template) {
  'use strict';

  var rows = 5;
  var cols = 10;
  var _template = _.template(template);

  var a = _template({
    rows: rows,
    cols: cols
  });
  
  return a;
});
