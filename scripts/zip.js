
(function(module) {
  var zip = {};
  neighborhoodTotals = {};
  zip.topFive = [];

  getData = function() {
    function justTheGoodProps(obj) {
      return {
        zipCode: obj.properties.zip,
        neighborhood: !!obj.properties.neighborhood ? obj.properties.neighborhood.split(', ')[0] : null,   // OR instead of [0] you can -->.splice(0,1).join()   dem string methods man
        address: !!obj.properties.address ? obj.properties.address : null,
        coordinates: {
          lat: obj.geometry.coordinates[1],
          lon: obj.geometry.coordinates[0]
        }
      };
    }

    $.getJSON('/data/manhattan.json', function(data) {
      data.features.map(justTheGoodProps).forEach(buildZipsDictionary);
      generateTopFive(neighborhoodTotals);
    });
  };

  function buildZipsDictionary(zipObj) {
    currentNeighborhood = zipObj.neighborhood;
    neighborhoodTotals[currentNeighborhood] ? neighborhoodTotals[currentNeighborhood]++ : neighborhoodTotals[currentNeighborhood] = 1;
  }

  function generateTopFive(obj) {
    for(neighborhood in obj) {
      zip.topFive.push({
        neighborhood: neighborhood,
        totalZips: obj[neighborhood]
      });
    }
    zip.topFive.sort(descending).splice(5);
  }

  var descending = function(curNeigh, nextNeigh) {
    return nextNeigh.totalZips - curNeigh.totalZips;
  };

  getData();
  module.zip = zip;
})(window);
