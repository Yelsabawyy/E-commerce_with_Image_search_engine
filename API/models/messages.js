const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    required: true
  },

});

module.exports = mongoose.model('Message', productSchema);