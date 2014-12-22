var React = window.React = require('react');
var R = React.createElement;

var CoordInput = React.createClass({
  render: function() {
    return R('div', {
      children: [
        'Insert coordinates:',
        R('input', {
          id: 'inputA' + this.props.idNum,
          type: 'text'
        }),
        R('input', {
          id: 'inputB' + this.props.idNum,
          type: 'text'
        }),
      ]
    });
  }
});

var App = React.createClass({
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
      inputs.push(CoordInput({idNum: i}));
    }
    inputs.push(button);

    return R('div', {
      children: inputs
    })
  }
});

React.render(R('div', {
  children: App()
}), document.getElementById('react'));
