var React = require('react');
var R = React.createElement;

var CoordInput = module.exports = React.createClass({
  render: function() {
    return R('div', {
      className: 'coordInput',
      children: [
        'Path ' + this.props.idNum + ':',
        R('input', {
          className: 'coordInput-latLngInput coordInput-latLngInput-startLatInput',
          id: 'inputLatStart' + this.props.idNum,
          type: 'text',
          placeholder: 'Starting lat'
        }),
        R('input', {
          className: 'coordInput-latLngInput coordInput-latLngInput-startLngInput',
          id: 'inputLngStart' + this.props.idNum,
          type: 'text',
          placeholder: 'Starting lng'
        }),
        R('input', {
          className: 'coordInput-latLngInput coordInput-latLngInput-endLatInput',
          id: 'inputLatEnd' + this.props.idNum,
          type: 'text',
          placeholder: 'Ending lat'
        }),
        R('input', {
          className: 'coordInput-latLngInput coordInput-latLngInput-endLngInput',
          id: 'inputLngEnd' + this.props.idNum,
          type: 'text',
          placeholder: 'Ending lng'
        }),
      ]
    });
  }
});
