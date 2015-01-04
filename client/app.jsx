var React = window.React = require('react');
var R = React.createElement;
var CoordInputForm = require('./CoordInputForm.jsx');
var InputMap = require('./InputMap.jsx');
var CoordStore = require('./stores/CoordStore.js');
var AppDispatcher = require('./dispatcher/AppDispatcher.js');

var App = React.createClass({
  getInitialState: function() {
    CoordStore.addChangeListener(this._onChange);

    AppDispatcher.handleViewAction({
      actionType: 'LOAD_COORDS',
      data: [[1, 0], [7, 3]]
    });

    return null;
  },
  _onChange: function() {
    console.log('change was emitted');
    console.log(CoordStore.getCoords());
  },
  render: function() {
    return R('div', {
      children: [R('h1', {}, 'Route planner'), R(CoordInputForm), R(InputMap)]
    });
  }
});

React.render(R(App), document.getElementById('react'));
