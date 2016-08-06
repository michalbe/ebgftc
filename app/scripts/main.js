/*jshint browser: true*/

require(
  [
    './board/board'
  ],
  function(board) {
    'use strict';

    $('body').html(board);
  }
);
