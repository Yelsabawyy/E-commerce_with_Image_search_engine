const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  Ingredients: {
    type: Array,
    required: true
  },
  Steps: {
    type: Array,
    required: true
  },
  Products: {
    type: Array,
    required: true
  }

});


module.exports = mongoose.model('Recipe', userSchema);
