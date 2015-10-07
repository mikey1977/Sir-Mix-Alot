// Model class
//   Should not be used directly
//     -should extend this class for each model/collection



// schema : an object that defines all properties/fields of the model
//   e.g.
//   {
//     name : String,
//     pass : String,
//     age : Number
//   }

var DataStore = require('./DataStore.js').store;

// var storeA = new DataStore();

function Model(schema) {
  this.schema = schema;

  //null id means that instance is not saved to database yet
  this.id = null;

  //create properties for each field defined in schema
  // then set to null
  for (var key in schema) {
    this[key] = null;
  }

  //create a new collection in DS using the name of the current model
  DataStore[this.constructor.name] = DataStore[this.constructor.name] || [];

  // DataStore.store[this.constructor.name] = [];  //this will write over
}

Model.prototype.save = function() {
  if (this.id === null) {

    //should be the subclass ex. Gundam.getNextId();
    this.id = this.constructor.getNextId();

    //this is an instance of Gundam/user
    DataStore[this.constructor.name].push(this);
  }
};

// remove the document from its store
Model.prototype.destroy = function() {
//   if (this.id !== null) {
//     var newId = this.id;
//     console.log(this.id);
//   }
// }
  // first make sure it exists
//   var collection = DataStore[this.constructor.name];
//   collection.forEach(function(current, index, array) {
//     if ( index === this) {
//       delete array[index];
//     }
//   });

// };


  // if (this.id !== null) {
  //   var newId = this.id;
  //   DataStore[this.constructor.name].splice(newId - 1, 1, null);
    //   }
    // }
  if (this.id !== null) {
    var newId = this.id;
    DataStore[this.constructor.name].forEach(function(current, index, array) {
      if (current.id === newId) {
        array.splice(index, 1);
      }
    });
}

  // if (DataStore[this.constructor.name].id !== null) {

  };

// returns the highest id + 1
Model.getNextId = function() {

  // Jon's example
//   return DataStore[this.name].reduce(function(highestSoFar,doc,idx,arr) {
//     return highestSoFar < doc.id ? doc.id : highestSoFar;
//   }, 0) +1;
// };
  var max = 0;
  var length = DataStore[this.name].length;
  var data = DataStore[this.name];
  for (var i = 0; i < length; i++) {
    if (data[i].id > max) {
      max = data[i].id;
    }
  }

  return max + 1;
};

Model.find = function(id) {

  // return DataStore[this.name].filter(function(doc) {
  //   return doc.id === id;
  // })[0] || null;

  for (var i = 0; i < DataStore[this.name].length; i++) {

    if (DataStore[this.name][i].id == id) {
      return DataStore[this.name][i];
    }
  }
  //   if (DataStore.store[this.prototype.constructor.name].id > 0) {
  //     DataStore.store[this.prototype.constructor.name].id === id;
  //   }
  // }
  // console.log(DataStore.store[this.prototype.constructor.name].id);
  // return DataStore.store[this.prototype.constructor.name][i];
  return null;
};

Model.extend = function (klass) {
  var methodName;

  //extend static methods (class methods), from Model onto Subclass
  for (methodName in Model) {
    klass[methodName] = Model[methodName];
  }

  //extend prototype methods (member methods)
  for (methodName in Model.prototype) {
    klass.prototype[methodName] = Model.prototype[methodName];
  }
};

module.exports = Model;

