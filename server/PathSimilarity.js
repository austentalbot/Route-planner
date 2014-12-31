//http://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line

var PathSimilarity = function(pathA, pathB) {
  var distance = function(path, point) {
    return Math.abs(
      (path[1][1]-path[0][1])*point[0] -
      (path[1][0]-path[0][0])*point[1] +
      path[1][0]*path[0][1] -
      path[1][1]*path[0][0]
    )/
    Math.sqrt(
      Math.pow(path[1][1]-path[0][1], 2) +
      Math.pow(path[1][0]-path[0][0], 2)
    );
  };
  var minStartDist = Math.min(distance(pathA, pathB[0]), distance(pathB, pathA[0]));
  var minEndDist = Math.min(distance(pathA, pathB[1]), distance(pathB, pathA[1]));
  return {
    start: minStartDist,
    end: minEndDist,
    total: minStartDist+minEndDist
  };
};

// PathSimilarity([[1, 2], [10, 10]], [[0, 0], [7, 6]]);

module.exports = PathSimilarity;
