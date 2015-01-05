var Route = require('./Route.js');
var ConvertCoords = require('./ConvertCoords.js');

var RoutePlanner = function(stops, convertToRoute) {
  //accepts array of Routes or tuples to be converted to Routes
  if(!convertToRoute)  {
    this.stops = stops;
  } else {
    routifiedStops = [];
    stops.forEach(function(stop) {
      // routifiedStops.push(new Route(stop[0], stop[1]));
      console.log('stop', stop);
      routifiedStops.push(new Route(
        ConvertCoords.latLngToMercator({lat: stop[0][0], lng: stop[0][1]}, true),
        ConvertCoords.latLngToMercator({lat: stop[1][0], lng: stop[1][1]}, true)
      ));
    });
    this.stops = routifiedStops;
  }
  this.finalRoute = [];
  this.totalRouteLength = 0;

  //set up starting point
  this.currentPoint = this.stops[0].start;
  // this.finalRoute.push(this.currentPoint);
  console.log('current point', this.currentPoint);
  this.finalRoute.push(ConvertCoords.mercatorToLatLng({x: this.currentPoint[0], y: this.currentPoint[1]}, true));
  this.stops[0].pickUp();
};

RoutePlanner.prototype.calculateDistance = function(pointA, pointB) {
  return Math.sqrt(
    Math.pow(pointA[0] - pointB[0], 2) +
    Math.pow(pointA[1] - pointB[1], 2)
  );
};

RoutePlanner.prototype.findRoute = function() {
  var closestDistance, closestPoint;
  var that = this;
  this.stops.forEach(function(stop) {
    //only calculate if one of the points has not been hit
    if (!stop.droppedOff) {
      var distance;
      //if hasn't been picked up yet
      if (!stop.pickedUp) {
        distance = that.calculateDistance(that.currentPoint, stop.start);
      } else {
        distance = that.calculateDistance(that.currentPoint, stop.end);
      }
      if (closestDistance === undefined || distance < closestDistance) {
        closestDistance = distance;
        closestPoint = stop;
      }
    }
  });

  if (closestDistance!==undefined) {
    if (!closestPoint.pickedUp) {
      this.currentPoint = closestPoint.start;
      closestPoint.pickUp();
    } else {
      this.currentPoint = closestPoint.end;
      closestPoint.dropOff();
    }
    // this.finalRoute.push(this.currentPoint);
    this.finalRoute.push(ConvertCoords.mercatorToLatLng({x: this.currentPoint[0], y: this.currentPoint[1]}, true));
    this.totalRouteLength += closestDistance;

    //recurse
    return this.findRoute();
  }
  return this.finalRoute;
};

// var route1 = [[0, 9], [30, 23]];
// var route2 = [[1, 6], [21, 24]];
// var route3 = [[2, 1], [23, 25]];
// var route4 = [[3, 3], [25, 26]];
// var route5 = [[4, 4], [27, 30]];
// var route6 = [[5, 0], [29, 28]];
// var route7 = [[6, 10], [20, 26]];
// var route8 = [[7, 7], [24, 20]];
// var route9 = [[8, 2], [26, 21]];
// var route10 = [[9, 8], [28, 22]];
// var route11 = [[10, 7], [30, 23]];
// var route12 = [[1, 6], [29, 24]];
// var route13 = [[2, 5], [27, 29]];
// var route14 = [[3, 4], [25, 27]];
// var route15 = [[4, 3], [23, 25]];
// var route16 = [[5, 2], [20, 23]];
// var route17 = [[6, 1], [22, 21]];
// var route18 = [[7, 0], [24, 22]];
// var route19 = [[8, 10], [26, 24]];
// var route20 = [[9, 3], [28, 26]];

// var planA = new RoutePlanner([
//   route1, route2, route3, route4, route5,
//   route6, route7, route8, route9, route10,
//   route11, route12, route13, route14, route15,
//   route16, route17, route18, route19, route20
// ], true);

// // var routeA = new Route([0, 0], [4, 4]);
// // var routeB = new Route([0, 1], [2, 3]);
// // var routeC = new Route([[3, 2], [4, 3]]);

// var planA = new RoutePlanner([routeA, routeB, routeC], true);
// planA.findRoute();

module.exports = RoutePlanner;
