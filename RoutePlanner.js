//Create route planner

var RoutePlanner = function(stops) {
  //accepts array of Routes
  this.stops = stops;
  this.finalRoute = [];
  this.totalRouteLength = 0;

  //set up starting point
  this.currentPoint = this.stops[0].start;
  this.finalRoute.push(this.currentPoint);
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
    var distance;
    //only calculate if one of the points has not been hit
    if (!stop.droppedOff) {
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

  console.log(closestDistance);
  if (closestDistance!==undefined) {
    if (!closestPoint.pickedUp) {
      this.currentPoint = closestPoint.start;
      closestPoint.pickUp();
    } else {
      this.currentPoint = closestPoint.end;
      closestPoint.dropOff();
    }
    this.finalRoute.push(this.currentPoint);
    this.totalRouteLength += closestDistance;
    closestDistance = undefined;
    closestPoint = undefined;

    //recurse
    return this.findRoute();
  }
  return this.finalRoute;
};

var routeA = new Route([0, 0], [4, 4]);
var routeB = new Route([0, 1], [2, 3]);
var routeC = new Route([3, 2], [4, 3]);

var planA = new RoutePlanner([routeA, routeB, routeC]);
planA.findRoute();

module.exports = RoutePlanner;
