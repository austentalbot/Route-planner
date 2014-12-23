var React = require('react');
var R = React.createElement;
var CoordInput = require('./CoordInput.jsx');

var CoordInputForm = module.exports = React.createClass({
  setInitialInputs: function() {
    this.inputs = [R(CoordInput, {idNum: 0})];
  },
  getInitialState: function() {
    this.setInitialInputs();
    return {
      coords: 1
    };
  },
  render: function() {
    var that = this;
    var addButton = R('button', {
      onClick: function() {
        that.inputs.push(R(CoordInput, {idNum: that.state.coords}));
        that.setState({
          coords: that.state.coords + 1
        });
      }
    }, 'Add another point');

    var submitButton = R('button', {
      onClick: function() {
        //submit values
        var allCoordinates = [];
        var coordA, coordB;
        for (var i=0; i<that.state.coords; i++) {
          coordA = parseFloat(document.getElementById('inputA'+i).value);
          coordB = parseFloat(document.getElementById('inputB'+i).value);
          allCoordinates.push([coordA, coordB]);
        }
        console.log(allCoordinates); //send allCoordinates to server
        that.setState(that.getInitialState());
      }
    }, 'Submit');

    return R('div', {
      className: 'coordInputForm',
      children: this.inputs.concat([addButton, submitButton])
    })
  }
});
