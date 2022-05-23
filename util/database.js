const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://arsh:arsh985@node-complete-guide.dvxv5.mongodb.net/shop?retryWrites=true&w=majority').then(client => {
  console.log('Connected to MongoDB server');
  _db = client.db();
  callback();
}).catch(err => {
console.log('err :', err);
  console.log('Could not connect to MongoDB server');
});

}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;