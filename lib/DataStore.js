
//  store = {
//   'ModelName' : [],
//   'OtherModel' : [
//     {
//       id : 1,
//       nae : 'value'
//     }
//   ]
// }
function DataStore() {

  // reserved space for new instances of models to be saved and retrieved later
  this.store = {};
}

// var theDataStore = new DataStore();

module.exports = new DataStore();