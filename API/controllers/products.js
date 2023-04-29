const product = require('../models/product');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const ReadyMeals = require('../models/readyMeals');
const io =require('../socket');

//fetch index
exports.fetchIndexPage =(req, res, next) => {
console.log("reached fetch index")
  Product.find({ $expr: { $gt: [ "$oldprice" , "$currentprice" ] } }).limit(20).then(deals => {
    ReadyMeals.find().limit(20).then(readyMeals => {
      Product.find({ $or:[{'category':{ $regex : new RegExp("Snacks", "i") }},{'subCategory':{ $regex : new RegExp("Snacks", "i") }} ]}).limit(20).then(snacks => {
    
          res.status(200).json({
            deals: deals,
            readyMeals:readyMeals,
            snacks:snacks,
            });

      }); 
    }); 
  }); 



}


// add Product
exports.addProduct = (req, res, next) => {

    const name=req.body.name;
    const price=req.body.price;
    const imageUrl=req.body.imageUrl;
    const brand=req.body.brand;
    const description=req.body.description;
    const quantity=req.body.quantity;
    const category=req.body.category;
    const subCategory=req.body.subCategory;
    const storeLocation=req.body.storeLocation;

    const product =new Product({
      name:name,
      currentprice:price,
      oldprice:null,
      description:description,
      image:imageUrl,
      brand:brand,
      quantity:quantity,
      category:category,
      subCategory:subCategory,
      storeLocation:storeLocation
    });

    product.save()
    .then(result=>{
        res.status(200).json({
            message: 'Add Product successfully.',
          });
      })
    .catch(err=>{console.log(err);});
  
};


//update product
exports.updateProduct = (req, res, next) => {
    
    const id=req.body.id;
    const name=req.body.name;
    const currentprice=req.body.price;
    const image=req.body.image;
    const brand=req.body.brand;
    const description=req.body.description;
    const quantity=req.body.quantity;
    const category=req.body.category;
    const subCategory=req.body.subCategory;
    const storeLocation=req.body.storeLocation;
    console.log(image);
  Product.findById(id)
    .then(product => {
      product.name = name;
      product.oldprice = product.currentprice;
      product.currentprice = currentprice;
      product.image = image;
      product.brand = brand;
      product.description = description;
      product.quantity = quantity;
      product.subCategory = subCategory;
      product.category = category;
      product.storeLocation = storeLocation;
      return product.save();
    }).then(result => {
      res.status(200).json({
          message: 'Updated successfully.',
        });
    })
    .catch(err => console.log(err));
 
};

//update ready meal
exports.updateReadyMeal = (req, res, next) => {
    
    const id=req.body.id;
    const name=req.body.name;
    const currentprice=req.body.price;
    const image=req.body.image;
    const brand=req.body.brand;
    const description=req.body.description;
    const quantity=req.body.quantity;
    const storeLocation=req.body.storeLocation;

    ReadyMeals.findById(id)
    .then(product => {
      product.name = name;
      product.oldprice = product.currentprice;
      product.currentprice = currentprice;
      product.image = image;
      product.brand = brand;
      product.description = description;
      product.quantity = quantity;
      product.storeLocation = storeLocation;
      return product.save();
    }).then(result => {
      res.status(200).json({
          message: 'Updated successfully.',
        });
    })
    .catch(err => console.log(err));
 
};

//delete product
exports.deleteProduct = (req, res, next) => {
    
    const id=req.body.id;

    Product.findByIdAndDelete(id)
    .then(result=>{
        res.status(200).json({
            message: 'Deleted successfully.',
          });
      ;})
    .catch(err => console.log(err));
 
};

//delete Ready Meals
exports.deleteReadyMeal = (req, res, next) => {
    
    const id=req.body.id;

    ReadyMeals.findByIdAndDelete(id)
    .then(result=>{
        res.status(200).json({
            message: 'Deleted successfully.',
          });
      ;})
    .catch(err => console.log(err));
 
};

// add ready meal
exports.addReadyMeal = (req, res, next) => {

    const name=req.body.name;
    const price=req.body.price;
    const imageUrl=req.body.imageUrl;
    const brand=req.body.brand;
    const description=req.body.description;
    const quantity=req.body.quantity;
    const category=req.body.category;
    const subCategory=req.body.subCategory;
    const storeLocation=req.body.storeLocation;

    const readyMeals =new ReadyMeals({
      oldprice:null,
      name:name,
      currentprice:price,
      description:description,
      image:imageUrl,
      brand:brand,
      quantity:quantity,
      category:category,
      subCategory:subCategory,
      storeLocation:storeLocation
    });

    readyMeals.save()
    .then(result=>{
        res.status(200).json({
            message: 'Add Ready Meal successfully.',
          });
      })
    .catch(err=>{console.log(err);});
  
};


// search Products
exports.postSearch=(req,res,next)=>{
  
  const search=req.params.search;
  const sort=req.params.sort;
  var filter=req.params.filter; 

  let Brand = {};
    // Product.find({ $or:[ {'name':objId}, {'name':param}, {'nickname':param} ]})
  var sortType=1;  
  if(sort=="low_high"){
    sortType =1;
  }
  else if(sort=="high_low"){
    sortType =-1;
  }

  Product.find({ $or:[{'category':{ $regex : new RegExp(search, "i") }},{'subCategory':{ $regex : new RegExp(search, "i") }}, {'name':{ $regex : new RegExp(search, "i") }}, {'description':{ $regex : new RegExp(search, "i") }}, {'brand':{ $regex : new RegExp(search, "i") }} ]}).sort({currentprice: sortType})
  .then(products => {
    products.forEach(function (a) {
      Brand[a.brand] = (Brand[a.brand] || 0) + 1;
  });    
  let brandkeys = [];
  let brandvalue = [];
  for (let key in Brand) {
    brandkeys.push(key);
    brandvalue.push(Brand[key]);
  }
  if(filter !=='undefined'){
    console.log("entered");
    
    if(!Array.isArray(filter)){
      filterArray=[];
      filterArray.push(filter);
      filter=filterArray;
      console.log(filter);
      var filterString = filter.toString();
      console.log("filterString")
      console.log(filterString)
      filter =filterString.split(',');
    }

    filterProducts=[];
    for (let product of products) {
      console.log(filter.includes(product.brand));
      if(filter.includes(product.brand)){
        filterProducts.push(product);
      }
    }

    products=filterProducts;
    
    
  }
  
      res.status(200).json({
          message: 'Fetched products successfully.',
          products: products,
          brandkey :brandkeys,
          brandvalue :brandvalue,
          searchQuery:search,
          sortType:sort,
          filter:filter
        });
    });  
   

  } 

   

// search Category
exports.postSearchCategory=(req,res,next)=>{
  
  const search=req.params.search;
  const sort=req.params.sort;
  var filter=req.params.filter; 
  var sortType;  
  if(sort=="low_high"){
    sortType =1;
  }
  else if(sort=="high_low"){
    sortType =-1;
  }
  console.log(search);
  let Brand = {};
    // Product.find({ $or:[ {'name':objId}, {'name':param}, {'nickname':param} ]})
    Product.find({ $or:[{'category':{ $regex : new RegExp(search, "i") }} ]}).sort({currentprice: sortType})
    .then(products => {
      products.forEach(function (a) {
        Brand[a.brand] = (Brand[a.brand] || 0) + 1;
    });    
    let brandkeys = [];
    let brandvalue = [];
    for (let key in Brand) {
      brandkeys.push(key);
      brandvalue.push(Brand[key]);
    }
    
    console.log(filter);
    if(filter !=="undefined"){
      console.log("entered");
      
      if(!Array.isArray(filter)){
        filterArray=[];
        filterArray.push(filter);
        filter=filterArray;
        console.log(filter);
        var filterString = filter.toString();
        console.log("filterString")
        console.log(filterString)
        filter =filterString.split(',');
      }
  
      filterProducts=[];
      for (let product of products) {
        console.log(filter.includes(product.brand));
        if(filter.includes(product.brand)){
          filterProducts.push(product);
        }
      }
  
      products=filterProducts;
      
      
    }
        res.status(200).json({
            message: 'Fetched products successfully.',
            products: products,
            brandkey :brandkeys,
            brandvalue :brandvalue,
            sortType:sort,
            filter:filter
            
          });
      });  
  }

// search Category
exports.postSearchSubCategory=(req,res,next)=>{
  
  const search=req.params.search;
  const sort=req.params.sort;
  var filter=req.params.filter; 
  var sortType;  
  if(sort=="low_high"){
    sortType =1;
  }
  else if(sort=="high_low"){
    sortType =-1;
  }
  console.log(search);
  let Brand = {};
    // Product.find({ $or:[ {'name':objId}, {'name':param}, {'nickname':param} ]})
    Product.find({ $or:[{'subCategory':{ $regex : new RegExp(search, "i") }} ]}).sort({currentprice: sortType})
    .then(products => {
      products.forEach(function (a) {
        Brand[a.brand] = (Brand[a.brand] || 0) + 1;
    });    
    let brandkeys = [];
    let brandvalue = [];
    for (let key in Brand) {
      brandkeys.push(key);
      brandvalue.push(Brand[key]);
    }
    
    console.log(filter);
    if(filter !=="undefined"){
      console.log("entered");
      
      if(!Array.isArray(filter)){
        filterArray=[];
        filterArray.push(filter);
        filter=filterArray;
        console.log(filter);
        var filterString = filter.toString();
        console.log("filterString")
        console.log(filterString)
        filter =filterString.split(',');
      }
  
      filterProducts=[];
      for (let product of products) {
        console.log(filter.includes(product.brand));
        if(filter.includes(product.brand)){
          filterProducts.push(product);
        }
      }
  
      products=filterProducts;
      
      
    }
        res.status(200).json({
            message: 'Fetched products successfully.',
            products: products,
            brandkey :brandkeys,
            brandvalue :brandvalue,
            sortType:sort,
            filter:filter
            
          });
      });  
  }  

// fetch Ready Meals
exports.getReadyMeals=(req,res,next)=>{
  let Brand = {};
  const sort=req.params.sort;
  var filter=req.params.filter; 
  var sortType;  
  if(sort=="low_high"){
    sortType =1;
  }
  else if(sort=="high_low"){
    sortType =-1;
  }
  ReadyMeals.find().sort({currentprice: sortType}).then(products => {
    products.forEach(function (a) {
      Brand[a.brand] = (Brand[a.brand] || 0) + 1;
  });    
  let brandkeys = [];
  let brandvalue = [];
  for (let key in Brand) {
    brandkeys.push(key);
    brandvalue.push(Brand[key]);
  }
  if(filter !=='undefined'){
    console.log("entered");
    
    if(!Array.isArray(filter)){
      filterArray=[];
      filterArray.push(filter);
      filter=filterArray;
      console.log(filter);
      var filterString = filter.toString();
      console.log("filterString")
      console.log(filterString)
      filter =filterString.split(',');
    }

    filterProducts=[];
    for (let product of products) {
      console.log(filter.includes(product.brand));
      if(filter.includes(product.brand)){
        filterProducts.push(product);
      }
    }

    products=filterProducts;
    
    
  }
      res.status(200).json({
          message: 'The Meals Fetched successfully.',
          products: products,
          brandkey :brandkeys,
          brandvalue :brandvalue,
          sortType:sort,
          filter:filter
        });
    }); 

}


// fetch Deals (products)
exports.getDeals=(req,res,next)=>{
  let Brand = {};
  const sort=req.params.sort; 
  var filter=req.params.filter; 
  var sortType;  
  if(sort=="low_high"){
    sortType =1;
  }
  else if(sort=="high_low"){
    sortType =-1;
  }
  Product.find({ $expr: { $gt: [ "$oldprice" , "$currentprice" ] } }).sort({currentprice: sortType}).then(products => {
    products.forEach(function (a) {
      Brand[a.brand] = (Brand[a.brand] || 0) + 1;
  });    
  let brandkeys = [];
  let brandvalue = [];
  for (let key in Brand) {
    brandkeys.push(key);
    brandvalue.push(Brand[key]);
  }
  if(filter !=='undefined'){
    console.log("entered");
    
    if(!Array.isArray(filter)){
      filterArray=[];
      filterArray.push(filter);
      filter=filterArray;
      console.log(filter);
      var filterString = filter.toString();
      console.log("filterString")
      console.log(filterString)
      filter =filterString.split(',');
    }

    filterProducts=[];
    for (let product of products) {
      console.log(filter.includes(product.brand));
      if(filter.includes(product.brand)){
        filterProducts.push(product);
      }
    }

    products=filterProducts;
    
    
  }
      res.status(200).json({
          message: 'The Deals Fetched successfully.',
          products: products,
          brandkey :brandkeys,
          brandvalue :brandvalue,
          sortType:sort,
          filter:filter
        });
    });

}

// fetch Product By Id
exports.getProductById=(req,res,next)=>{
  const id = req.body.id;
  console.log(id);
  Product.findById(id).then(product => {
    console.log("product.category");
    console.log(product.category);
    // used for product page
    Product.find({ $or:[{'category':{ $regex : new RegExp(product.category, "i") }},{'subCategory':{ $regex : new RegExp(product.subCategory, "i") }} ]}).limit(20).then(similarProducts => {
      
        res.status(200).json({
          message: 'The Product is Fetched successfully.',
          product: product,
          similarProducts:similarProducts
        });
    
      });  
    });  
  }


// fetch Ready Meal By Id
exports.getReadyMealById=(req,res,next)=>{
  const id = req.body.id;

  console.log(id);
  ReadyMeals.findById(id).then(product => {

    // used for ready meal page
    ReadyMeals.find().limit(20).then(similarProducts => {
    
      res.status(200).json({
        message: 'The ReadyMeal is Fetched successfully.',
        product: product,
        similarProducts:similarProducts
      });
  
      });  
    });  
  }

// push comment  
exports.pushComment=(req,res,next)=>{

  const productId = req.body.productId;
  const comment = req.body.comment;
  let customerName=""; 

  User.findById(req.userId).then(user=>{     
    customerName = user.firstname + " " + user.lastname;
    objComment={
      customerName : customerName,
      customerComment:comment
    }
  
    Product.findByIdAndUpdate(
      { _id: productId }, 
      { $push: { theComments: objComment }}
  
    ).then(match=>{
        res.status(200).json({
          message: 'add Comment successfully.',
        });
       })
  });
  

  
 
 
  }

// push comment Meals  
exports.pushMealsComment=(req,res,next)=>{

  const productId = req.body.productId;
  const comment = req.body.comment;
  let customerName=""; 

  User.findById(req.userId).then(user=>{     
    customerName = user.firstname + " " + user.lastname;
    objComment={
      customerName : customerName,
      customerComment:comment
    }
  
    ReadyMeals.findByIdAndUpdate(
      { _id: productId }, 
      { $push: { theComments: objComment }}
  
    ).then(match=>{
        res.status(200).json({
          message: 'add Comment successfully.',
        });
       })
  });
  

  
 
 
  }

// fetch placed orders
exports.fetchPlacedOrders=(req,res,next)=>{
  
  const email=req.userEmail;
  const id=req.userId;
 
  Order.find({arrived: false}).then(orders => {
    res.status(200).json({
        message: 'The placed orders is Fetched successfully.',
        orders: orders,
      });
  }); 


  }
// fetch all orders
exports.fetchAllOrders=(req,res,next)=>{
  
  const email=req.userEmail;
  const id=req.userId;
 
  Order.find().then(orders => {
    res.status(200).json({
        message: 'The placed orders is Fetched successfully.',
        orders: orders,
      });
  }); 


  }
// placeOrder  
exports.placeOrder=(req,res,next)=>{
  
  const email=req.userEmail;
  const id=req.userId;
  const totalPrice=req.body.totalPrice;

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();  
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  today = dd + '/' + mm + '/' + yyyy + " - " + hour + ":" + minute + ":" + second;

  User.findById(id)
    .then(user => {
      req.user = user;
      console.log(req.user);
      req.user
      .populate("cart.items.productId")
      .populate("cart.mealsItems.readyMealId")
      .execPopulate()
      .then(user => {
        
        const order = new Order({
          user: {
            email: req.user.email,
            address: req.user.address,
            userId: req.userId
          },
          date: today,
          products: user.cart,
          orderPrice: totalPrice,
          ready: false,
          shipped: false,
          arrived: false
        })
        return order.save(function(err,order){
          var myorderId = order._id;
          console.log(myorderId)

          var nodemailer = require('nodemailer');
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
          var mailOptions = {
            from: 'yelsabawyy@gmail.com',
            to: email,
            subject: 'Your Order Is Placed Successfully.. Thank You!!',
            html: "<h1>YOELSABAWY Ecommerce</h1> <h3>'Your Order Is Placed Successfully.. Thank You!!' </h3> <h6> Your order Id :</h6>" + myorderId
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });








          });
      })
      .then(result => {
        io.getIO().emit('cart',{
          action :'send cart price' ,
          cartQuantity:0,
          totalPrice:0.00
      });



      Order.find({arrived: false}).then(orders => {
          io.getIO().emit('placedOrder',{
              action :'placed order' ,
              orders:orders.length,
          });
      }); 


    
        return req.user.clearCart();
        
      })
      .then(result => {
        res.status(200).json({
          message: "Order Created Successfully",
          post: result
        })
      })
    })
    .catch(err => {
      console.log(err);
  })

  }


// Change order ready to true
exports.readyTrue = (req, res, next) => {
  const orderId = req.body.orderId;
  Order.findByIdAndUpdate(orderId, {
    ready: true
  })
  .then(result => {
    res.status(200).json({
      message: "Order is Ready"
    })
  })
}

// Change order shipped to true
exports.shippedTrue = (req, res, next) => {
  const orderId = req.body.orderId;
  Order.findByIdAndUpdate(orderId, {
    ready: true,
    shipped: true
  })
  .then(result => {
    res.status(200).json({
      message: "Order Arrived Successfully"
    })
  })
}

// Change order arrived to true
exports.arrivedTrue = (req, res, next) => {
  const orderId = req.body.orderId;

  Order.findByIdAndUpdate(orderId, {
    ready: true,
    shipped: true,
    arrived: true
  })
  .then(result => {
    Order.find({arrived: false}).then(orders => {
      io.getIO().emit('placedOrder',{
          action :'placed order' ,
          orders:orders.length,
      });
  }); 
    res.status(200).json({
      message: "Order Arrived Successfully"
    })
  })
}

// Fetch order data (view orders)
exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then(orders => {

      res.status(200).json({
        message: "Orders fetched successfully",
        orders: orders
      })
    })
}

exports.postTrackOrder = (req, res, next) => {
  var mongoose = require('mongoose');
  console.log();
  if(req.body.orderId.length !== "60e7f8addadc751304e69f8f".length){     
    return res.status(422).json({
      message: "order is not found",
    });
  }

  String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
  };

  Order.findOne({_id:req.body.orderId.toObjectId()})
    .then(order => {
      if(!order){
              
        return res.status(422).json({
          message: "order is not found",
        });
      }
      console.log(order);
      order.populate("products.items.productId").populate("products.mealsItems.readyMealId")
      .execPopulate()
      .then(user => {
        const products = user.products.items;
        const meals = user.products.mealsItems;
        res.status(200).json({
          message: "Order fetched successfully",
          order: order,
          products: products,
          meals: meals,
        })
      })

    })
}
