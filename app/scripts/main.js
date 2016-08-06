/*jshint browser: true*/

require(
  [
    'jquery',
    '_',
    'board/board'
  ],
  function($, _, board) {
    'use strict';

    $('body').html(board);
  }
);
