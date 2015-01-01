var React = require('react');
var R = React.createElement;
var L = require('leaflet');

var InputMap = module.exports = React.createClass({
  componentDidMount: function() {
    var map = this.map = L.map(this.getDOMNode(), {zoomControl: false, attributionControl: false}).setView([37.789, -122.414], 12);
    new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    map.on('click', this.onMapClick);
  },
  componentWillUnmount: function() {
    this.map.off('click', this.onMapClick);
    this.map = null;
  },
  onMapClick: function() {
    //add click function
  },
  render: function() {
    return R('div', {
      className: 'map'
    });
  }
});

