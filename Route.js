//Create class for route

var Route = function(start, end) {
  this.start = start;
  this.end = end;
  this.pickedUp = false;
  this.droppedOff = false;
};

Route.prototype.pickUp = function() {
  this.pickedUp = true;
};

Route.prototype.dropOff = function() {
  this.droppedOff = true;
};

module.exports = Route;
