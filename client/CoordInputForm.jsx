var React = require('react');
var R = React.createElement;
var CoordInput = require('./CoordInput.jsx');

var CoordInputForm = module.exports = React.createClass({
  getInitialState: function() {
    return {
      coords: 1
    };
  },
  render: function() {
    var inputs = [];
    var that = this;
    var button = R('button', {
      onClick: function() {
        that.setState({
          coords: that.state.coords + 1
        });
      }
    }, 'add another point');
    for (var i = 0; i<this.state.coords; i++) {
      inputs.push(R(CoordInput, {idNum: i}));
    }
    inputs.push(button);

    return R('div', {
      className: 'coordInputForm',
      children: inputs
    })
  }
});
