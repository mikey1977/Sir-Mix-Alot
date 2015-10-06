var DataStore = require('./DataStore.js');

// var storeA = new DataStore();

function Model(schema) {
  this.schema = schema;
  this.id = null;

  for (var key in schema) {
    this[key] = null;
  }
  DataStore.store[this.constructor.name] = [];
}

module.exports = Model;