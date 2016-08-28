var SYSTEM = {
  asyncForEach: function(array, fn, callback) {
    array = array.slice(0);
    function processOne() {
      var item = array.pop();
      fn(item, function(result) {
        if (array.length > 0) {
          setTimeout(processOne, 0); // schedule immediately
        } else {
          callback(); // Done!
        }
      });
    }
    if (array.length > 0) {
      setTimeout(processOne, 0); // schedule immediately
    } else {
      callback(); // Done!
    }
  }
};
