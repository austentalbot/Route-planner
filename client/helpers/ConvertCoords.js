var ConvertCoords = {
  //CONSTANTS
  //PI/180: 0.017453292519943295
  //WGS-84 semimajor axis in meters: 6378137.0
  //Degrees per radian: 57.295779513082323
  //180/PI: 57.295779513082323
  //90 degrees: 1.5707963267948966
  latLngToMercator: function(latLng, array) {
    var num = latLng.lng * 0.017453292519943295;
    var x = 6378137.0 * num;
    var a = latLng.lat * 0.017453292519943295;

    var x_mercator = x;
    var y_mercator = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
    if (array) {
      return [x_mercator, y_mercator];
    }
    return {x: x_mercator, y: y_mercator};
  },
  mercatorToLatLng: function(mercator, array) {
    var num1 = mercator.x / 6378137.0;
    var num2 = num1 * 57.295779513082323;
    var num3 = Math.floor((num2 + 180.0) / 360.0);
    var num4 = num2 - (num3 * 360.0);
    var num5 = 1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercator.y) / 6378137.0)));
    var lng = num4;
    var lat = num5 * 57.295779513082323;
    if (array) {
      return [lat, lng];
    }
    return {lat: lat, lng: lng};
  }
};

module.exports = ConvertCoords;
