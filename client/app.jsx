var React = window.React = require('react');
var R = React.createElement;
var CoordInputForm = require('./CoordInputForm.jsx');
var InputMap = require('./InputMap.jsx');
var CoordStore = require('./stores/CoordStore.js');

var App = React.createClass({
  getInitialState: function() {
    CoordStore.addChangeListener(this._onChange);
    console.log(CoordStore.getCoords());
    CoordStore.emitChange();

    return null;
  },
  _onChange: function() {
    console.log('change was emitted');
  },
  render: function() {
    return R('div', {
      children: [R('h1', {}, 'Route planner'), R(CoordInputForm), R(InputMap)]
    });
  }
});

React.render(R(App), document.getElementById('react'));
