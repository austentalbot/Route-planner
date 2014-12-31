var React = window.React = require('react');
var R = React.createElement;
var CoordInputForm = require('./CoordInputForm.jsx');

var App = React.createClass({
  render: function() {
    return R('div', {
      children: ['Route planner', R(CoordInputForm)]
    });
  }
});

React.render(R(App), document.getElementById('react'));
