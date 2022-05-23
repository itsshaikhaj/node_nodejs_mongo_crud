const getDb = require('../util/database').getDb;
const ObjectId = require('mongodb').ObjectId;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp.then(result => {
      console.log(result);
    }
    ).catch(err => {
      console.log(err);
    }
    );
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
      .then(products => {
        console.log(products);
        return products;
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products').findOne({ _id: new ObjectId(prodId) })
      .then(product => {
        console.log("product PP:", product);
        return product;
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new ObjectId(prodId) })
      .then(result => {
        console.log(result);
      });
  }
}



module.exports = Product;
