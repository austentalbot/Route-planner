var React = require('react');
var R = React.createElement;
var reqwest = require('reqwest');
var CoordInput = require('./CoordInput.jsx');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var CoordInputForm = module.exports = React.createClass({
  getInitialState: function() {
    return {
      route: undefined,
      similarity: undefined
    };
  },
  render: function() {
    var that = this;
    var addButton = R('button', {
      onClick: function() {
        var latStart = document.getElementById('inputLatStart' + (that.props.coordCount - 1)).value;
        var lngStart = document.getElementById('inputLngStart' + (that.props.coordCount - 1)).value;
        var latEnd = document.getElementById('inputLatEnd' + (that.props.coordCount - 1)).value;
        var lngEnd = document.getElementById('inputLngEnd' + (that.props.coordCount - 1)).value;
        //only add new input if the previous one is complete
        if (latStart && lngStart && latEnd && lngEnd) {
          AppDispatcher.handleViewAction({
            actionType: 'INCREMENT_COORD_COUNT'
          });
        } else {
          alert('Please input coordinates first');
        }
      }
    }, 'Add path');

    var generateRouteButton = R('button', {
      onClick: function() {
        //submit values
        var allCoordinates = [];
        var coordA, coordB, latStart, lngStart, latEnd, lngEnd;
        for (var i=0; i<that.props.coordCount; i++) {
          latStart = parseFloat(document.getElementById('inputLatStart'+i).value);
          lngStart = parseFloat(document.getElementById('inputLngStart'+i).value);
          latEnd = parseFloat(document.getElementById('inputLatEnd'+i).value);
          lngEnd = parseFloat(document.getElementById('inputLngEnd'+i).value);
          if (latStart && lngStart && latEnd && lngEnd) {
            allCoordinates.push([[latStart, lngStart], [latEnd, lngEnd]]);
          }
        }
        console.log(allCoordinates);
        reqwest({
          url: 'http://localhost:6007/generateRoute',
          method: 'post',
          data: {
            coordinates: allCoordinates
          },
          error: function(err) {
            console.log(err);
          },
          success: function (resp) {
            console.log(JSON.stringify(resp));
            that.setState({route: resp, similarity: undefined});
          }
        });
      }
    }, 'Generate route');

    var calculateSimilarityButton = R('button', {
      onClick: function() {
        //submit values
        var allCoordinates = [];
        var coordA, coordB, latStart, lngStart, latEnd, lngEnd;
        for (var i=0; i<that.props.coordCount; i++) {
          latStart = parseFloat(document.getElementById('inputLatStart'+i).value);
          lngStart = parseFloat(document.getElementById('inputLngStart'+i).value);
          latEnd = parseFloat(document.getElementById('inputLatEnd'+i).value);
          lngEnd = parseFloat(document.getElementById('inputLngEnd'+i).value);
          if (latStart && lngStart && latEnd && lngEnd) {
            allCoordinates.push([[latStart, lngStart], [latEnd, lngEnd]]);
          }
        }
        console.log(allCoordinates); //send allCoordinates to server
        reqwest({
          url: 'http://localhost:6007/calculateSimilarity',
          method: 'post',
          data: {
            coordinates: allCoordinates
          },
          error: function(err) {
            console.log(err);
          },
          success: function (resp) {
            console.log(JSON.stringify(resp));
            that.setState({route: undefined, similarity: resp});
          }
        });
      }
    }, 'Calculate path similarity');

    var clearButton = R('button', {
      onClick: function() {
        //reset state to show only one input
        that.replaceState(that.getInitialState());

        //reset coord count in store
        AppDispatcher.handleViewAction({
          actionType: 'RESET_COORD_COUNT'
        });

        //clear remaining input box
        document.getElementById('inputLatStart0').value = '';
        document.getElementById('inputLngStart0').value = '';
        document.getElementById('inputLatEnd0').value = '';
        document.getElementById('inputLngEnd0').value = '';
      }
    }, 'Clear');

    var route = '';
    if (this.state.route !== undefined) {
      var routeChildren = [R('div', {}, 'Route:')];
      this.state.route.forEach(function(val, key) {
        routeChildren.push(R('div', {}, ['Stop ', key, ': (', val, ')'].join('')));
      });
      route = R('div', {
        children: routeChildren
      });
    }
    var similarity = '';
    if (this.state.similarity !== undefined) {
      var similarityChildren = [R('div', {}, 'Path similarities:')];
      var val, v;
      for (var key in this.state.similarity) {
        val = this.state.similarity[key];
        for (var k in val) {
          v = val[k];
          similarityChildren.push(R('div', {}, 'Path ' + key + ' / Path ' + k + ' similarity: ' + JSON.stringify(v)));
        }
      }

      similarity = R('div', {
        children: similarityChildren
      });
    }

    var inputs = [];
    for (var i = 0; i<that.props.coordCount; i++) {
      inputs.push(R(CoordInput, {idNum: i}));
    }
    return R('div', {
      className: 'coordInputForm',
      children: [
        addButton,
        generateRouteButton,
        calculateSimilarityButton,
        clearButton
      ].concat(inputs).concat([route, similarity])
    });
  }
});
