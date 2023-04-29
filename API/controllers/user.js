const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const Message = require('../models/messages');
const ReadyMeals = require('../models/readyMeals');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const product = require('../models/product');
const saltRounds = 10;
const io =require('../socket');




// register
exports.register = (req, res, next) => {

  const  firstname=req.body.firstname;
  const  lastname=req.body.lastname;
  const  phone=req.body.phone;
  const  email=req.body.email;
  const address=req.body.address;
  const  government=req.body.government;
  const confirmpassword=req.body.confirmpassword;
  const password=req.body.password;

  if(confirmpassword===password){
    User.findOne({ email: email })
    .then(User => {
      if (User) {
        return res.status(422).json({
          message: 'This Email Already Exist!!',
        });
      }
      return User;
    }).then(noUser=>{
    const hash = bcrypt.hashSync(password, saltRounds); 
    const user =new User({
      firstname:firstname,
      lastname:lastname,
      phoneNumber:phone,
      email:email,
      address:address,
      government:government,
      password:hash,
      admin:0
    });

    user.save()
    .then(result=>{
      Message.aggregate([{ $match: { 'seen': false } }]).then(messages => {
        return messages
      
      }).then(messages=>{
        io.getIO().emit('message', {action :'send message' ,unseenMessages:messages});
      });
        res.status(200).json({
            message: 'Create new Account successfully.',
          });
      });
    })
    .catch(err=>{console.log(err);});

  }else{
    res.status(422).json({
      message: "The Passwords Don't match",
    });
  }
  
};

// login
exports.login = (req, res, next) => {


  const email=req.body.email;
  const password=req.body.password;

  Order.find({arrived: false}).then(orders => {
    io.getIO().emit('placedOrder',{
        action :'placed order' ,
        orders:orders.length,
    });
}); 

  Message.aggregate([{ $match: { 'seen': false } }]).then(messages => {
    return messages
  
  }).then(messages=>{
    io.getIO().emit('message', {action :'send message' ,unseenMessages:messages});
  });

  User.findOne({ email: email })
    .then(User => {
      if (!User) {
        return res.status(422).json({
          message: "The Email Doesn't Exist!!",
        });
      }
      return User;
    }).then(user=>{
      bcrypt.compare(password, user.password).then(function(match) {
        if (!match) {
          return res.status(422).json({
            message: "Wrong Password!!",
          });
        } else{
          console.log("user");
          console.log(user);

          const token = jwt.sign({
            email:user.email,
            id:user._id.toString(),
          },'supersecretesupersuper',{expiresIn: '5h'});



          const cartMeals = [...user.cart.mealsItems];
          const cartProducts = [...user.cart.items];
          let quantity=0;
        
          for (let i = 0; i < cartMeals.length; i++) {
            quantity +=cartMeals[i].quantity;
          }
        
          for (let i = 0; i < cartProducts.length; i++) {
            quantity +=cartProducts[i].quantity;
          }
          console.log("quantity")
          console.log(quantity)
          console.log("user.cart.totalPrice")
          console.log(user.cart.totalPrice)
          io.getIO().emit('cart',{
              action :'send cart price' ,
              cartQuantity:quantity,
              totalPrice:user.cart.totalPrice
          });

          return res.status(422).json({
            message: "Logged In successfully.",
            token:token,
            admin:user.admin,
          });
        }
    });
    }).catch(err=>{

    });
  
};

// logout

exports.logout = (req, res, next) => {
  // jwt.destroy(req.body.token);
  res.status(200).json({
    message: "logout",
  });
}
// forgetPassword
exports.forgetPassword = (req, res, next) => {
  const email=req.body.email;
  console.log("-1");
  User.findOne({ email: email })
    .then(User => {
      if (!User) {
        return res.status(422).json({
          message: "Your Email is not found",
        });
      }
      return User;
    }).then(user=>{
      console.log("0");
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var randomString = 'at5fe8a';

      
      console.log("1");
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'yelsabawyy@gmail.com',    
          pass: 'You5461145y'
        }
      });
      console.log("2");
      var mailOptions = {
        from: 'yelsabawyy@gmail.com',
        to: email,
        subject: 'change password code ',
        html: '<h1>Change Password code</h1><h3> code:'+ randomString +'</h3>'
      };
      console.log("3");
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      console.log("4");
      return res.status(200).json({
        message: "Email Found",
        email:email,
        randomString:randomString,
      });
    }).catch(err=>{

    });
  
};

// forgetPassword
exports.forgetPasswordChangePassword = (req, res, next) => {

           const email=req.body.email;
           const randomString=req.body.randomString;
           const code=req.body.code;
           const password=req.body.password;
           const confirmPassword=req.body.confirmPassword;


  User.findOne({ email: email })
    .then(User => {

      // at5fe8a
      if (code!==randomString) {
        return res.status(422).json({
          message: "Incorrect code!!",
        });
      }
      return User;
    }).then(user=>{
      if (password!==confirmPassword) {
        return res.status(422).json({
          message: "Passwords Don't Match!!",
        });
      }else{
        const hash = bcrypt.hashSync(password, saltRounds); 
        User.findOne({ email: email })
        .then(user => {
          user.firstname=user.firstname;
          user.lastname=user.lastname;
          user.phoneNumber=user.phoneNumber;
          user.email=user.email;
          user.address=user.address;
          user.government=user.government;
          user.password=hash;
          user.admin=user.admin;
          user.favourite=user.favourite;
          user.cart=user.cart;
          user.recentView=user.recentView;
          return user.save();
        }).then(result => {
          res.status(200).json({
              message: 'change Password!!',
            });
        })
        .catch(err => console.log(err));


  }

    }).catch(err=>{
      next();
    });

 
  
};
// changePasswordFromMyAccount
exports.changePasswordFromMyAccount = (req, res, next) => {
           const email=req.userEmail;
           const oldPassword=req.body.oldPassword;
           const password=req.body.password;
           const confirmPassword=req.body.confirmPassword;

  User.findOne({ email: email })
    .then(User => {
      console.log(User);
      bcrypt.compare(oldPassword, User.password).then(function(match) {
        if (!match) {
          return res.status(422).json({
            message: "Incorrect Password!!",
            user:User
          });
        }
      });
      return User;
    }).then(user=>{
      if (password!==confirmPassword) {
        return res.status(422).json({
          message: "Passwords Don't Match!!",
          user:user
        });
      }else{

        const hash = bcrypt.hashSync(password, saltRounds); 
        User.findOne({ email: email })
        .then(user => {
          user.firstname=user.firstname;
          user.lastname=user.lastname;
          user.phoneNumber=user.phoneNumber;
          user.email=user.email;
          user.address=user.address;
          user.government=user.government;
          user.password=hash;
          user.admin=user.admin;
          user.favourite=user.favourite;
          user.cart=user.cart;
          user.recentView=user.recentView;
          return user.save();
        }).then(result => {
          res.status(200).json({
              message: 'change Password!!',
            });
        })
        .catch(err => console.log(err));


  }

    }).catch(err=>{
      next();
    });

 
  
};

// changeAddressFromMyAccount
exports.changeAddressFromMyAccount = (req, res, next) => {
           const email=req.userEmail;
           const address=req.body.address;


  User.findOne({ email: email })
    .then(User => {
      return User;
    }).then(user=>{

        User.findOne({ email: email })
        .then(user => {
          user.firstname=user.firstname;
          user.lastname=user.lastname;
          user.phoneNumber=user.phoneNumber;
          user.email=user.email;
          user.address=address;
          user.government=user.government;
          user.password=user.password;
          user.admin=user.admin;
          user.favourite=user.favourite;
          user.cart=user.cart;
          user.recentView=user.recentView;
          return user.save();
        }).then(result => {
          res.status(200).json({
              message: 'change Address!!',
            });
        })
        .catch(err => console.log(err));


  

    }).catch(err=>{
      next();
    });

 
  
};

// add product to cart
exports.addProductToCart = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;
  const productQty=req.body.productQty;
  Product.findById(id)
          .then(product => {

            User.findById(req.userId).then(user=>{             
              user.addToCart(product, productQty);
            });

            // User.findById(req.userId).then(user=>{

            //   const cartMeals = [...user.cart.mealsItems];
            //   const cartProducts = [...user.cart.items];
            //   let quantity=0;

            //   for (let i = 0; i < cartMeals.length; i++) {
            //     quantity +=cartMeals[i].quantity;
            //   }

            //   for (let i = 0; i < cartProducts.length; i++) {
            //     quantity +=cartProducts[i].quantity;
            //   }
            
            //   io.getIO().emit('cart',{
            //       action :'send cart price' ,
            //       cartQuantity:quantity,
            //       totalPrice:user.cart.totalPrice
            //   });
            // });

            res.status(200).json({
                message: 'Cart Value.',
            });


          })
        .catch(err=>{
          console.log(err);
        });
};


// update product to cart
exports.updateProductToCart = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;
  const productQty=req.body.productQty;
  Product.findById(id)
          .then(product => {

            User.findById(req.userId).then(user=>{             
              user.updateToCart(product, productQty);
            });

            // User.findById(req.userId).then(user=>{

            //   const cartMeals = [...user.cart.mealsItems];
            //   const cartProducts = [...user.cart.items];
            //   let quantity=0;

            //   for (let i = 0; i < cartMeals.length; i++) {
            //     quantity +=cartMeals[i].quantity;
            //   }

            //   for (let i = 0; i < cartProducts.length; i++) {
            //     quantity +=cartProducts[i].quantity;
            //   }
            
            //   io.getIO().emit('cart',{
            //       action :'send cart price' ,
            //       cartQuantity:quantity,
            //       totalPrice:user.cart.totalPrice
            //   });
            // });

            res.status(200).json({
                message: 'Cart Value.',
            });


          })
        .catch(err=>{
          console.log(err);
        });
};
// update meal to cart
exports.updateMealToCart = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;
  const productQty=req.body.productQty;
  ReadyMeals.findById(id)
          .then(product => {

            User.findById(req.userId).then(user=>{             
              user.updateMealToCart(product, productQty);
            });

            // User.findById(req.userId).then(user=>{

            //   const cartMeals = [...user.cart.mealsItems];
            //   const cartProducts = [...user.cart.items];
            //   let quantity=0;

            //   for (let i = 0; i < cartMeals.length; i++) {
            //     quantity +=cartMeals[i].quantity;
            //   }

            //   for (let i = 0; i < cartProducts.length; i++) {
            //     quantity +=cartProducts[i].quantity;
            //   }
            
            //   io.getIO().emit('cart',{
            //       action :'send cart price' ,
            //       cartQuantity:quantity,
            //       totalPrice:user.cart.totalPrice
            //   });
            // });

            res.status(200).json({
                message: 'Cart Value.',
            });


          })
        .catch(err=>{
          console.log(err);
        });
};

// delete product to cart
exports.deleteProductToCart = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;

  User.findById(req.userId).then(user=>{             
    user.deleteItemFromCart(id);
    res.status(200).json({
      message: 'Delete from Cart.',
  });
  
  }).catch(err=>{
          console.log(err);
        });
};

// delete meal to cart
exports.deleteMealToCart = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;

  User.findById(req.userId).then(user=>{             
    user.deleteMealFromCart(id);
    res.status(200).json({
      message: 'Delete from Cart.',
  });

  }).catch(err=>{
          console.log(err);
        });
};


// add Meal to cart
exports.addMealToCart = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;
  const productQty=req.body.productQty;
  ReadyMeals.findById(id)
          .then(product => {
            User.findById(req.userId).then(user=>{          
              user.addMealToCart(product, productQty);
            });

            res.status(200).json({
                message: 'Added to cart',
            });


          })
        .catch(err=>{
          console.log(err);
        });
};


exports.myAccount = (req, res, next) => {
  
    const id=req.userId;

    User.findById(id)
        .then(user => {
          req.user = user;
  
          req.user
            .populate("favourite.items.productId").populate("favourite.mealsItems.readyMealId")
            .execPopulate()
            .then(user => {
              const products = user.favourite.items;
              const meals = user.favourite.mealsItems;
        
          return res.status(200).json({
                products: products,
                meals: meals,
                user: req.user
          });
            }) 
        })
  
};



exports.getCart = (req, res, next) => {

  const email=req.userEmail;
  const id=req.userId;

      User.findById(id)
      .then(user => {
        req.user = user;
        const totalPrice = req.user.cart.totalPrice;
        req.user
          .populate("cart.items.productId").populate("cart.mealsItems.readyMealId")
          .execPopulate()
          .then(user => {
            const products = user.cart.items;
            const meals = user.cart.mealsItems;
            res.status(200).json({
              message: "Fetched Cart Products Successfully",
              products: products,
              meals: meals,
              totalPrice: totalPrice
            })
          }) 
      })
      .catch(err => console.log(err));

}


// add product to cart
exports.addProductToFavourite = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;
  Product.findById(id)
          .then(product => {

            User.findById(req.userId).then(user=>{             
              user.addTofavourite(product);
            });

            res.status(200).json({
                message: 'Cart Value.',
            });


          })
        .catch(err=>{
          console.log(err);
        });
};

// remove product to cart
exports.removeProductToFavourite = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;
  Product.findById(id)
          .then(product => {

            User.findById(req.userId).then(user=>{             
              user.deleteItemFromfavourite(product._id);
            });

            res.status(200).json({
                message: 'Cart Value.',
            });


          })
        .catch(err=>{
          console.log(err);
        });
};

// remove product to cart
exports.removeMealToFavourite = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;
  ReadyMeals.findById(id)
          .then(product => {
            console.log(product)
            User.findById(req.userId).then(user=>{             
              user.deleteMealFromfavourite(product._id);
            });

            res.status(200).json({
                message: 'Cart Value.',
            });


          })
        .catch(err=>{
          console.log(err);
        });
};

// add product to cart
exports.addMealToFavourite = (req, res, next) => {
  const email=req.userEmail;
  const id=req.body.id;
  ReadyMeals.findById(id)
          .then(product => {
            console.log(product)
            User.findById(req.userId).then(user=>{             
              user.addMealTofavourite(product);
            });

            res.status(200).json({
                message: 'Cart Value.',
            });


          })
        .catch(err=>{
          console.log(err);
        });
};