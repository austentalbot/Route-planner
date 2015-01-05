var React = window.React = require('react');
var R = React.createElement;
var CoordInputForm = require('./CoordInputForm.jsx');
var InputMap = require('./InputMap.jsx');
var CoordStore = require('../stores/CoordStore.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var getCoordState = function() {
  return {
    coordCount: CoordStore.getCoordCount()
  };
};

var MainApp = module.exports = React.createClass({
  getInitialState: function() {
    CoordStore.addChangeListener(this._onChange);
    return getCoordState();
  },
  _onChange: function() {
    console.log('change was emitted');
    this.setState(getCoordState());
  },
  render: function() {
    return R('div', {
      children: [
        R('h1', {}, 'Route planner'),
        R(CoordInputForm, {coordCount: this.state.coordCount}),
        R(InputMap, {coordCount: this.state.coordCount})
      ]
    });
  }
});
