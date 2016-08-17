/*jshint browser: true*/

var BOARD = (function() {
  'use strict';

  var rows = 5;
  var cols = 11;
  var _template = _.template($('#GameBoardTemplate').html());

  return {
    template: _template({
      rows: rows,
      cols: cols
    }),
    rows: rows,
    cols: cols
  };
})();
