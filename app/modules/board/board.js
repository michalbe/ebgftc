/*jshint browser: true*/

GAME.board = function() {
  'use strict';

  var rows = 5;
  var cols = 11;
  var _template = _.template($('#GameBoardTemplate').html());

  return _template({
    rows: rows,
    cols: cols
  });
};
