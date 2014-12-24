var React = require('react');
var R = React.createElement;

var CoordInput = module.exports = React.createClass({
  render: function() {
    return R('div', {
      className: 'coordInput',
      children: [
        'Insert coordinates:',
        R('input', {
          id: 'inputLatStart' + this.props.idNum,
          type: 'text'
        }),
        R('input', {
          id: 'inputLngStart' + this.props.idNum,
          type: 'text'
        }),
        R('input', {
          id: 'inputLatEnd' + this.props.idNum,
          type: 'text'
        }),
        R('input', {
          id: 'inputLngEnd' + this.props.idNum,
          type: 'text'
        }),
      ]
    });
  }
});
