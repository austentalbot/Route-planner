var React = require('react');
var R = React.createElement;

var CoordInput = module.exports = React.createClass({
  render: function() {
    return R('div', {
      className: 'coordInput',
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
