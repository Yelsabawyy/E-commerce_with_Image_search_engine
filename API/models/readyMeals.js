const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  oldprice: {
    type: Number,
    required: false
  },
  currentprice: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: false
  },
  storeLocation:  [{
    type: String,
    required:true
}],
theComments :[{
  customerName: String,
  customerComment: String,
  required:false
}]
});

module.exports = mongoose.model('ReadyMeals', productSchema);