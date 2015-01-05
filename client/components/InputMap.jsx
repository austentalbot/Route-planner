var React = require('react');
var R = React.createElement;
var L = require('leaflet');
var EventEmitter = require('events').EventEmitter;

// set up leaflet icons
L.Icon.Default.imagePath = 'leaflet/dist/images/';

var InputMap = module.exports = React.createClass({
  componentDidMount: function() {
    var map = this.map = L.map(this.getDOMNode(), {zoomControl: false, attributionControl: false}).setView([37.789, -122.414], 12);
    new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);
    L.tileLayer('http://api.tiles.mapbox.com/v3/jnamgoong.kkpahlbc/{z}/{x}/{y}.png', {}).addTo(map);

    map.on('click', this.onMapClick);
  },
  componentWillUnmount: function() {
    this.map.off('click', this.onMapClick);
    this.map = null;
  },
  onMapClick: function(e) {
    console.log('clicked', e);
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
    //TODO: add coordinates to route
    var event = new EventEmitter();
    event.emit('added point', e);
  },
  render: function() {
    return R('div', {
      className: 'map'
    });
  }
});

