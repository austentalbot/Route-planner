var React = require('react');
var R = React.createElement;
var CoordInput = require('./CoordInput.jsx');

var CoordInputForm = module.exports = React.createClass({
  inputs: [R(CoordInput, {idNum: 0})],
  getInitialState: function() {
    return {
      coords: 0
    };
  },
  render: function() {
    var that = this;
    var button = R('button', {
      onClick: function() {
        that.setState({
          coords: that.state.coords + 1
        });
        that.inputs.push(R(CoordInput, {idNum: that.state.coords}));
      }
    }, 'add another point');

    return R('div', {
      className: 'coordInputForm',
      children: this.inputs.concat([button])
    })
  }
});
