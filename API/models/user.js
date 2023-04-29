const mongoose = require('mongoose');
const Product = require("./product");
const ReadyMeals = require("./readyMeals");
const io =require('../socket');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  },
  cart: {
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
  favourite: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
      }
    ],
    mealsItems: [
      {
        readyMealId: {
          type: Schema.Types.ObjectId,
          ref: 'ReadyMeals',
          required: true
        },
      },
    ],
  },
  recentView: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
      }
    ]
  },
});



// add Product to cart
userSchema.methods.addToCart = function(product, productQty) {
  console.log(product);
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });

  const oldTotalPrice = (this.cart.totalPrice) ? this.cart.totalPrice: 0

  let updatedTotalPrice = oldTotalPrice;

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  
  if(cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + parseInt(productQty);
    updatedCartItems[cartProductIndex].quantity = newQuantity;
    updatedTotalPrice += parseFloat(product.currentprice) * parseInt(productQty);
    
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: parseInt(productQty)
    })
    updatedTotalPrice += parseFloat(product.currentprice) * parseInt(productQty);
  }

  const updatedCart = {
    items: updatedCartItems,
    mealsItems:[...this.cart.mealsItems],
    totalPrice: updatedTotalPrice
  }

  this.cart = updatedCart; 
  
  
  const cartMeals = [...updatedCart.mealsItems];
  const cartProducts = [...updatedCart.items];
  let quantity=0;

  for (let i = 0; i < cartMeals.length; i++) {
    quantity +=cartMeals[i].quantity;
  }

  for (let i = 0; i < cartProducts.length; i++) {
    quantity +=cartProducts[i].quantity;
  }

  io.getIO().emit('cart',{
      action :'send cart price' ,
      cartQuantity:quantity,
      totalPrice:updatedCart.totalPrice
  });




  return this.save();
}


// update Product to cart
userSchema.methods.updateToCart = function(product, productQty) {

  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });

  const oldTotalPrice = (this.cart.totalPrice) ? this.cart.totalPrice: 0

  let updatedTotalPrice = oldTotalPrice;

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  
  if(cartProductIndex >= 0) {
    newQuantity = parseInt(productQty);
    oldQuantity = this.cart.items[cartProductIndex].quantity;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
    updatedTotalPrice += parseFloat(product.currentprice) * newQuantity;
    updatedTotalPrice -= parseFloat(product.currentprice) * oldQuantity;
    
  } 

  const updatedCart = {
    items: updatedCartItems,
    mealsItems:[...this.cart.mealsItems],
    totalPrice: updatedTotalPrice
  }

  this.cart = updatedCart; 
  
  
  const cartMeals = [...updatedCart.mealsItems];
  const cartProducts = [...updatedCart.items];
  let quantity=0;

  for (let i = 0; i < cartMeals.length; i++) {
    quantity +=cartMeals[i].quantity;
  }

  for (let i = 0; i < cartProducts.length; i++) {
    quantity +=cartProducts[i].quantity;
  }

  io.getIO().emit('cart',{
      action :'send cart price' ,
      cartQuantity:quantity,
      totalPrice:updatedCart.totalPrice
  });




  return this.save();
}








// add meal to cart
userSchema.methods.addMealToCart = function(product, productQty) {
  const cartProductIndex = this.cart.mealsItems.findIndex(cp => {
    return cp.readyMealId.toString() === product._id.toString();
  });

  const oldTotalPrice = (this.cart.totalPrice) ? this.cart.totalPrice: 0

  let updatedTotalPrice = oldTotalPrice;

  let newQuantity = 1;
  const updatedCartmealsItems = [...this.cart.mealsItems];
  
  if(cartProductIndex >= 0) {
    newQuantity = this.cart.mealsItems[cartProductIndex].quantity + parseInt(productQty);
    updatedCartmealsItems[cartProductIndex].quantity = newQuantity;
    updatedTotalPrice += parseFloat(product.currentprice) * parseInt(productQty);
    
  } else {
    updatedCartmealsItems.push({
      readyMealId: product._id,
      quantity: parseInt(productQty)
    })
    updatedTotalPrice += parseFloat(product.currentprice) * parseInt(productQty);
  }

  const updatedCart = {
    items:[...this.cart.items],
    mealsItems: updatedCartmealsItems,
    totalPrice: updatedTotalPrice
  }
  this.cart = updatedCart; 
  
  
  const cartMeals = [...updatedCart.mealsItems];
  const cartProducts = [...updatedCart.items];
  let quantity=0;

  for (let i = 0; i < cartMeals.length; i++) {
    quantity +=cartMeals[i].quantity;
  }

  for (let i = 0; i < cartProducts.length; i++) {
    quantity +=cartProducts[i].quantity;
  }

  io.getIO().emit('cart',{
      action :'send cart price' ,
      cartQuantity:quantity,
      totalPrice:updatedCart.totalPrice
  });


  return this.save();
}

// update Meal to cart
userSchema.methods.updateMealToCart = function(product, productQty) {
  const cartProductIndex = this.cart.mealsItems.findIndex(cp => {
    return cp.readyMealId.toString() === product._id.toString();
  });

  const oldTotalPrice = (this.cart.totalPrice) ? this.cart.totalPrice: 0

  let updatedTotalPrice = oldTotalPrice;

  let newQuantity = 1;
  const updatedCartmealsItems = [...this.cart.mealsItems];
  
  if(cartProductIndex >= 0) {


    newQuantity = parseInt(productQty);
    oldQuantity = this.cart.mealsItems[cartProductIndex].quantity;
    updatedCartmealsItems[cartProductIndex].quantity = newQuantity;
    updatedTotalPrice += parseFloat(product.currentprice) * newQuantity;
    updatedTotalPrice -= parseFloat(product.currentprice) * oldQuantity;
    
  } 

  const updatedCart = {
    items:[...this.cart.items],
    mealsItems: updatedCartmealsItems,
    totalPrice: updatedTotalPrice
  }
  this.cart = updatedCart; 
  
  
  const cartMeals = [...updatedCart.mealsItems];
  const cartProducts = [...updatedCart.items];
  let quantity=0;

  for (let i = 0; i < cartMeals.length; i++) {
    quantity +=cartMeals[i].quantity;
  }

  for (let i = 0; i < cartProducts.length; i++) {
    quantity +=cartProducts[i].quantity;
  }

  io.getIO().emit('cart',{
      action :'send cart price' ,
      cartQuantity:quantity,
      totalPrice:updatedCart.totalPrice
  });


  return this.save();
}

// delete item from cart
userSchema.methods.deleteItemFromCart = function(prodId) {
  const oldTotalPrice = this.cart.totalPrice;
  const productQuantity = this.cart.items.find(product => {
    return product.productId.toString() === prodId.toString();
  }).quantity;
  
  return Product.findById(prodId)
    .then(product => {
      const productPrice = parseFloat(product.currentprice);
      let updatedTotalPrice = (oldTotalPrice - (productPrice * productQuantity)).toFixed(2);
      if(updatedTotalPrice < 0)
        updatedTotalPrice = 0;
      const updatedCartItems = this.cart.items.filter(p => {
        return p.productId.toString() !== prodId.toString();
      });
      const updatedCart = {
        items: updatedCartItems,
        mealsItems:[...this.cart.mealsItems],
        totalPrice: updatedTotalPrice
      };

      this.cart = updatedCart;

      const cartMeals = [...updatedCart.mealsItems];
      const cartProducts = [...updatedCart.items];
      let quantity=0;
    
      for (let i = 0; i < cartMeals.length; i++) {
        quantity +=cartMeals[i].quantity;
      }
    
      for (let i = 0; i < cartProducts.length; i++) {
        quantity +=cartProducts[i].quantity;
      }
    
      io.getIO().emit('cart',{
          action :'send cart price' ,
          cartQuantity:quantity,
          totalPrice:updatedCart.totalPrice
      });



      return this.save();
    });
}

// delete meal from cart
userSchema.methods.deleteMealFromCart = function(prodId) {
  const oldTotalPrice = this.cart.totalPrice;
  const productQuantity = this.cart.mealsItems.find(product => {
    return product.readyMealId.toString() === prodId.toString();
  }).quantity;
  
  return ReadyMeals.findById(prodId)
    .then(product => {
      const productPrice = parseFloat(product.currentprice);
      let updatedTotalPrice = (oldTotalPrice - (productPrice * productQuantity)).toFixed(2);
      if(updatedTotalPrice < 0)
        updatedTotalPrice = 0;
      const updatedCartmealsItems = this.cart.mealsItems.filter(p => {
        return p.readyMealId.toString() !== prodId.toString();
      });
      const updatedCart = {
        mealsItems: [... this.cart.items],
        mealsmealsItems:updatedCartmealsItems,
        totalPrice: updatedTotalPrice
      };

      this.cart = updatedCart;

      const cartMeals = [...updatedCart.mealsmealsItems];
      const cartProducts = [...updatedCart.mealsItems];
      let quantity=0;
    
      for (let i = 0; i < cartMeals.length; i++) {
        quantity +=cartMeals[i].quantity;
      }
    
      for (let i = 0; i < cartProducts.length; i++) {
        quantity +=cartProducts[i].quantity;
      }
    
      io.getIO().emit('cart',{
          action :'send cart price' ,
          cartQuantity:quantity,
          totalPrice:updatedCart.totalPrice
      });



      return this.save();
    });
}

userSchema.methods.clearCart = function() {
  this.cart = {
    items: [],
    totalPrice: 0
  }
  this.save();
}



userSchema.methods.deleteItemFromfavourite = function(prodId) {
  return Product.findById(prodId)
    .then(product => {
      const updatedfavouriteItems = this.favourite.items.filter(p => {
        return p.productId.toString() !== prodId.toString();
      });
      const updatedfavourite = {
        items: updatedfavouriteItems,
        mealsItems:[...this.favourite.mealsItems],
      };

      this.favourite = updatedfavourite;
      return this.save();
    });
}

// mt3mlsh lesa!!
userSchema.methods.deleteMealFromfavourite = function(prodId) {
  return ReadyMeals.findById(prodId)
    .then(product => {
      const updatedfavouritemealsItems = this.favourite.mealsItems.filter(p => {
        return p.readyMealId.toString() !== prodId.toString();
      });
      const updatedfavourite = {
        items:[...this.favourite.items],
        mealsItems: updatedfavouritemealsItems,
      };

      this.favourite = updatedfavourite;
      return this.save();
    });
}

userSchema.methods.addTofavourite= function(product) {
  const updatedfavouriteItems = [...this.favourite.items];
  let productInfavourite = false;

  for(let item of updatedfavouriteItems) {
    if(item.productId.toString() === product._id.toString())
      productInfavourite = true;
  }

  if(!productInfavourite) {
    updatedfavouriteItems.push({
      productId: product._id
    });
  }

  const updatedfavourite= {
    items: updatedfavouriteItems,
    mealsItems:[...this.favourite.mealsItems],
  }

  this.favourite= updatedfavourite
  return this.save();

}
userSchema.methods.addMealTofavourite= function(product) {
  const updatedfavouritemealsItems = [...this.favourite.mealsItems];
  let productInfavourite = false;

  for(let item of updatedfavouritemealsItems) {
    if(item.readyMealId.toString() === product._id.toString())
      productInfavourite = true;
  }

  if(!productInfavourite) {
    updatedfavouritemealsItems.push({
      readyMealId: product._id
    });
  }

  const updatedfavourite= {
    items:[...this.favourite.items],
    mealsItems: updatedfavouritemealsItems,
  }

  this.favourite= updatedfavourite
  return this.save();

}


module.exports = mongoose.model('User', userSchema);
