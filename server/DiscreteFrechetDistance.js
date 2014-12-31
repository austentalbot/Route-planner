var DiscreteFrechetDistance = function(routeA, routeB) {
  var calculateDistance = function(pointA, pointB) {
    return Math.sqrt(
      Math.pow(pointA[0] - pointB[0], 2) +
      Math.pow(pointA[1] - pointB[1], 2)
    );
  };

  var C = [];
  var dim = routeA.length;
  var i, j;

  C[0] = calculateDistance(routeA[0], routeB[0]);

  for (j = 1; j < dim; j++) {
    C[j] = Math.max(C[j-1], calculateDistance(routeA[0], routeB[j]));
  }

  for (i = 1; i < dim; i++) {
    C[i*dim] = Math.max(C[(i-1)*dim], calculateDistance(routeA[i], routeB[0]));
  }

  for (i = 1; i < dim; i++ ) {
    for (j = 1; j < dim; j++) {
      C[i*dim+j] = Math.max(
        Math.min(C[(i-1)*dim+j], C[(i-1)*dim+j-1], C[i*dim+j-1]),
        calculateDistance(routeA[i], routeB[j])
      );
    }
  }

  return C[C.length-1];
};

// DiscreteFrechetDistance([[0, 0], [30, 30]], [[3, 7], [24, 29]]);
// DiscreteFrechetDistance([[0, 0], [30, 30]], [[0, 5], [30, 27]]);
// DiscreteFrechetDistance([[0, 0], [30, 30]], [[5, 5], [25, 25]]);

module.exports = DiscreteFrechetDistance;
