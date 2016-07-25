var results = [];

(function(module) {
  var zip = {};

  getData = function() {
    $.getJSON('/data/manhattan.json', function(data) {
      // TODO: start here!
      results.push(data);
    });
  };

  getData();
  module.zip = zip;
})(window);
