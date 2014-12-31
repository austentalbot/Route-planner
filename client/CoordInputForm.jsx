var React = require('react');
var R = React.createElement;
var reqwest = require('reqwest');
var CoordInput = require('./CoordInput.jsx');

var CoordInputForm = module.exports = React.createClass({
  setInitialInputs: function() {
    this.inputs = [R(CoordInput, {idNum: 0})];
  },
  getInitialState: function() {
    this.setInitialInputs();
    return {
      coords: 1,
      route: undefined
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
          latStart = parseFloat(document.getElementById('inputLatStart'+i).value);
          lngStart = parseFloat(document.getElementById('inputLngStart'+i).value);
          latEnd = parseFloat(document.getElementById('inputLatEnd'+i).value);
          lngEnd = parseFloat(document.getElementById('inputLngEnd'+i).value);
          allCoordinates.push([[latStart, lngStart], [latEnd, lngEnd]]);
        }
        console.log(allCoordinates); //send allCoordinates to server
        reqwest({
          url: 'http://localhost:6007/createRoute',
          method: 'post',
          data: {
            coordinates: allCoordinates
          },
          error: function(err) {
            console.log(err);
          },
          success: function (resp) {
            console.log(JSON.stringify(resp));
            that.setState({route: JSON.stringify(resp)});
          }
        });
      }
    }, 'Submit');
    
    var titles = R('div', {
      children: ['Start latitude', 'Start longitude', 'End latitude', 'End longitude']
    });

    var route = this.state.route !== undefined ? 'Route: ' + this.state.route : '';

    return R('div', {
      className: 'coordInputForm',
      children: [addButton, submitButton, titles].concat(this.inputs).concat(route)
    });
  }
});
