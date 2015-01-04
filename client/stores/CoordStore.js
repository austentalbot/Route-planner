var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

//internal array of coordinates
var _coords = [];

// Method to load coords from action data
function loadCoords(data) {
  _coords = data.coords;
}

// Merge our store with Node's Event Emitter
var CoordStore = merge(EventEmitter.prototype, {

  getCoords: function() {
    return _coords;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  // Define what to do for certain actions
  if (action.actionType === 'LOAD_COORDS') {
    // Call internal method based upon dispatched action
    loadCoords(action.data);
    
    // If action was acted upon, emit change event
    CoordStore.emitChange();
  }
  
  return true;
});

module.exports = CoordStore;
