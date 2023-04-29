const Product = require('../models/product');
const User = require('../models/user');
const Point = require("../models/points");
const points = require('../models/points');

// fetch cart products
exports.getCartProducts = (req, res, next) => {
  const totalCartPrice = req.user.cart.totalPrice;
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.status(200).json({
        message: "Fetched Cart Products Successfully",
        products: products,
        totalPrice: totalCartPrice
      })
    })
}

// fetch wishlist products
exports.getWishlistProducts = (req, res, next) => {
  req.user
    .populate("wishList.items.productId")
    .execPopulate()
    .then(user => {
      const products = user.wishList.items;
      res.status(200).json({
        message: "Fetched Cart Products Successfully",
        products: products
      })
    })
}


//fetch products
exports.getProducts=(req,res,next)=>{
  Product.find().then(products => {
      res.status(200).json({
          message: 'Fetched posts successfully.',
          products: products,
        });
    });  
}

//product details
exports.getProductById=(req,res,next)=>{
const id = req.body.id;
let productPriceInPoints;


Product.findById(id).then(product => {
  Point.findById("606b4859b8ef091944781576")
  .then(pointsDoc => {
    res.status(200).json({
        message: 'The Product is Fetched successfully.',
        product: product,
        productPriceInPoints: parseFloat(product.currentprice) * parseInt(pointsDoc.pointToEg)
      });
  })

  });  
}

exports.addProduct = (req, res, next) => {
    const title=req.body.title;
    const oldPrice=req.body.oldPrice;
    const newPrice=req.body.newPrice;
    const image=req.body.image;
    const brand=req.body.brand;
    const description=req.body.description;
    // const category=req.body.categories;
    // const subCategory=req.body.subCategories;
    const product =new Product({
      name:title,
      currentprice:newPrice,
      oldprice:oldPrice,
      description:description,
      image:image,
      brand:brand,
      // category:??,
    });
    product.save()
    .then(result=>{
        res.status(200).json({
            message: 'Add Product successfully.',
          });
      })
    .catch(err=>{console.log(err);});
  
};

//delete product
exports.deleteProductById = (req, res, next) => {
  const id = req.body.id;
  Product.findByIdAndDelete(id)
  .then(result=>{
      res.status(200).json({
          message: 'Deleted successfully.',
        });
    ;})
  .catch(err=>{console.log(err);});  
};

//update product
exports.updateProduct = (req, res, next) => {

  const id=req.body.id;
  const title=req.body.title;
  const oldPrice=req.body.oldPrice;
  const newPrice=req.body.newPrice;
  const image=req.body.image;
  const brand=req.body.brand;
  const description=req.body.description;
      // const category=req.body.categories;
  // const subCategory=req.body.subCategories;


  Product.findById(id)
    .then(product => {
      product.name = title;
      product.currentprice = newPrice;
      product.oldPrice = oldPrice;
      product.image = image;
      product.brand = brand;
      product.description = description;
      return product.save();
    }).then(result => {
      res.status(200).json({
          message: 'Updated successfully.',
        });
    })
    .catch(err => console.log(err));
 
};


//login user  
exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
console.log(email);
  User.findOne({ email: email })
    .then(User => {
      if (!User) {
        return res.status(422).send("This Email Is Not Exist!!");
      }
      return password == User.password;
    })
    .then(isEqual => {
      if (!isEqual) {
        return res.status(422).send("This Password Is Wrong!!");
      }
      res.status(200).json({ 
        // token: token, userId: loadedUser._id.toString()
       });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

// Add User
exports.addUser = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;

  const user = new User({
      username: username,
      email: email,
      password: password,
      points: "0",
      address: address,
      admin: false
    });
    user.save()
    .then(result=>{
        res.status(200).json({
            message: 'Add User successfully.',
          });
      })
    .catch(err => {
      console.log(err);
    });  
  };


  exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    const productQty = req.body.productQty;
    console.log(prodId);
    Product.findById(prodId)
      .then(product => {
        req.user.addToCart(product, productQty)
        console.log(req.user.addToCart(product, productQty));
      })
      .then(result => {
        res.status(201).json({
          message: 'Product Added To Cart Successfully',
          post: result
        });
      })
  }

  // Deletes a cart item
  exports.postDeleteCart = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
      .deleteItemFromCart(prodId)
      .then(result => {
        res.status(200).json({
          message: "Cart Item Deleted Successfully",
          post: result
        })
      })
  }

  // Deletes a wishlist item
  exports.postDeleteWishlistItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
      .deleteItemFromWishlist(prodId)
      .then(result => {
        res.status(200).json({
          message: "Wishlist Item Deleted Successfully",
          post: result
        })
      })
  }
  
  // Decrease the quantity of one cart item
  exports.postDecreaseCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
      .then(product => {
        req.user
          .deleteOneItemFromCart(product)
          .then(result => {
            res.status(200).json({
              message: "Cart Item Decreased Successfully",
              post: result
            })
          })
      })
  }

  exports.postWishlist = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
      .then(product => {
        req.user.addToWishlist(product)
      })
      .then(result => {
        res.status(201).json({
          message: 'Product Added To Wishlist Successfully',
          post: result
        });
      })
    }
    
    exports.postEditPoints = (req, res, next) => {
      const points = req.body.points;
      Point.updateOne({_id: "606b4859b8ef091944781576"}, {
        pointToEg: points
      })
      .then(result => {
        res.status(201).json({
          message: 'Points Updated Successfully',
          post: result
        })
      })
  }

//special products
exports.getSpecialProducts=(req,res,next)=>{
    Product.find({ $expr: { $gt: [ "$oldprice" , "$currentprice" ] } } ).then(products => {
      console.log(products);
        res.status(200).json({
            message: 'Fetched products successfully.',
            products: products,
          });
      });  
  }


//search  
// exports.postSearchProducts=(req,res,next)=>{
//   const search=req.body.search;
//   let Brand = {};
//     Product.find({ $or:[ {'name':{ $regex : new RegExp(search, "i") }}, {'description':{ $regex : new RegExp(search, "i") }}, {'brand':{ $regex : new RegExp(search, "i") }} ]})
//     .then(products => {
//       products.forEach(function (a) {
//         Brand[a.brand] = (Brand[a.brand] || 0) + 1;
//     });
//     console.log(Brand);
//     var brandkeys = [];
//     var brandvalue = [];
//     for (var key in Brand) {
//       brandkeys.push(key);
//       brandvalue.push(Brand[key]);
//     }
    
//         res.status(200).json({
//             message: 'Fetched products successfully.',
//             products: products,
//             brandkey :brandkeys,
//             brandvalue :brandvalue
//           });
//       });  
//   }   




  
