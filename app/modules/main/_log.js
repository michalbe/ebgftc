var LOG = (function() {
  var log = $('<div></div>')
  .addClass('log');
  //$('body').append(log);

  var addText = function(text) {
    log.html(log.html() + '<br>'+ text);
    log.scrollTop(log[0].scrollHeight);
  };

  return {
    ge: function(text) {
      addText('<b>Game event: ' + text + '</b>');
    },
    pa: function(text) {
      addText('Player action: ' + text);
    },
    ua: function(text) {
      addText('Unit action: ' + text);
    }
  };
})();
