const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      },
    ],
    mealsItems: [
      {
        readyMealId: {
          type: Schema.Types.ObjectId,
          ref: 'ReadyMeals',
          required: true
        },
        quantity: { type: Number, required: true }
      },
    ],
    totalPrice: {
      type: Number,
      require: true,
      default: 0
    }
  },
  date: {
    type: String,
    required: true
  },
  orderPrice: {
    type: Number,
    required: true
  },
  user: {
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  arrived: {
    type: Boolean,
    required: true
  },
  ready: {
    type: Boolean,
    required: true
  },
  shipped: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model("Order", orderSchema);