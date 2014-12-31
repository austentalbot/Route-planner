//http://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line

var PathSimilarity = function(paths) {
  this.paths = paths;
  this.similarityMatrix = undefined;
};

PathSimilarity.prototype.distance = function(path, point) {
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

PathSimilarity.prototype.calculateSimilarityPair = function(pathA, pathB) {
  var minStartDist = Math.min(this.distance(pathA, pathB[0]), this.distance(pathB, pathA[0]));
  var minEndDist = Math.min(this.distance(pathA, pathB[1]), this.distance(pathB, pathA[1]));
  return {
    start: minStartDist,
    end: minEndDist,
    total: minStartDist+minEndDist
  };
};

PathSimilarity.prototype.createSimilarityMatrix = function() {
  similarityMatrix = {};
  var that = this;
  this.paths.forEach(function(value, key) {
    similarityMatrix[key] = similarityMatrix[key] || {};
    that.paths.forEach(function(v, k) {
      //only run if keys are not the same and value not already calculated
      if (k!==key && similarityMatrix[key][k]===undefined) {
        similarityMatrix[k] = similarityMatrix[k] || {};

        var similarity = that.calculateSimilarityPair(value, v);
        similarityMatrix[key][k] = similarity;
        similarityMatrix[k][key] = similarity;
      }
    });
  });

  this.similarityMatrix = similarityMatrix;
  return similarityMatrix;
};

// var similarities = new PathSimilarity([
//   [[1, 2], [10, 10]],
//   [[0, 0], [7, 6]],
//   [[1, 0], [7, 9]]
// ]);
// similarities.createSimilarityMatrix();

module.exports = PathSimilarity;
