const request =require('request');
const fetch = require('node-fetch');
const { body } = require('express-validator');

const openSocket= require('socket.io-client');


var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

exports.addnewbranch=(req,res,next)=>{
    
    res.render('../views/admin/addNewBranch',{
        admin:localStorage.getItem('admin'),
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
    });
}
exports.addproduct=(req,res,next)=>{
    
    res.render('../views/admin/addProduct',{
        addProduct:"",
        update:"false",
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}

exports.addReadyMeal=(req,res,next)=>{
    
    res.render('../views/admin/addReadyMeal',{
        addReadyMeal:"",
        updateReadyMeal:"false",
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}


// add products
exports.postAddProducts= (req,resmain,next) =>{
    
    const options = {
        url: 'http://localhost:3052/feeds/addProduct',
        json: true,
        method: 'POST',
        body: {
              name:req.body.name,
              price:req.body.price,
              imageUrl:req.body.imageUrl,
              description:req.body.description,
              brand:req.body.brand,
              quantity:req.body.quantity,
              category:req.body.category,
              subCategory:req.body.subCategory,
              storeLocation:req.body.location,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Add Product successfully."){
            resmain.render('../views/admin/addProduct',{
                addProduct:"true",
                update:"false",
                unseenMessages:localStorage.getItem('unseenMessages'),
                admin:localStorage.getItem('admin'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
            });
        }
        else{
            resmain.render('../views/admin/addProduct',{
                addProduct:"false",
                update:"false",
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            }); 
        }
    });

}

// go to update form product
exports.updateForm= (req,resmain,next) =>{
    
    
    const options = {
        url: 'http://localhost:3052/feeds/fetchProductById',
        json: true,
        body: {
               id:req.body.id,
        },
        
    };

    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log("check");
        console.log(body);
        resmain.render('../views/admin/addProduct',{
            addProduct:"false",
            update:"true",
            product:body.product,
            unseenMessages:localStorage.getItem('unseenMessages'),
            totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
            admin:localStorage.getItem('admin')
        });
        

    });



}

// go to update form Ready Meals
exports.updateFormReadyMeals= (req,resmain,next) =>{
    
    
    const options = {
        url: 'http://localhost:3052/feeds/fetchReadyMealById',
        json: true,
        body: {
               id:req.body.id,
        },
        
    };

    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        resmain.render('../views/admin/addReadyMeal',{
            addReadyMeal:"false",
            updateReadyMeal:"true",
            product:body.product,
            unseenMessages:localStorage.getItem('unseenMessages'),
            totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
            admin:localStorage.getItem('admin')
        });
        

    });



}

// update product
exports.postUpdateProduct= (req,resmain,next) =>{
    
    console.log(req.body.id);
    console.log(req.body.name);
    const options = {
        url: 'http://localhost:3052/feeds/updateProduct',
        json: true,
        method: 'POST',
        body: {
              id:req.body.id,
              name:req.body.name,
              price:req.body.price,
              image:req.body.imageUrl,
              description:req.body.description,
              brand:req.body.brand,
              quantity:req.body.quantity,
              category:req.body.category,
              subCategory:req.body.subCategory,
              storeLocation:req.body.location,
              
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Updated successfully."){
            //resmain.render('../views/shop/index.ejs',);
            resmain.redirect('/');
        }
        else{
            resmain.render('../views/admin/addProduct',{
                updateProduct:"false",
                update:"true",
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            }); 
        }
    });

}


// update Ready meal
exports.postupdateReadyMeal= (req,resmain,next) =>{
    
    console.log(req.body.id);
    console.log(req.body.name);
    const options = {
        url: 'http://localhost:3052/feeds/updateReadyMeal',
        json: true,
        method: 'POST',
        body: {
              id:req.body.id,
              name:req.body.name,
              price:req.body.price,
              image:req.body.imageUrl,
              description:req.body.description,
              brand:req.body.brand,
              quantity:req.body.quantity,
              storeLocation:req.body.location,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Updated successfully."){
            //resmain.render('../views/shop/index.ejs',);
            resmain.redirect('/');
        }
        else{
            resmain.render('../views/admin/addProduct',{
                updateProduct:"false",
                update:"true",
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            }); 
        }
    });

}

// delete product
exports.postDeleteProduct= (req,resmain,next) =>{
    
    console.log(req.body.id);
    console.log(req.body.name);
    const options = {
        url: 'http://localhost:3052/feeds/deleteProduct',
        json: true,
        method: 'POST',
        body: {
              id:req.body.id,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else{
             //resmain.render('../views/shop/index.ejs',);
             resmain.redirect('/');
        }

    });

}

// delete ReadyMeal
exports.postdeleteReadyMeal= (req,resmain,next) =>{
    
    const options = {
        url: 'http://localhost:3052/feeds/deleteReadyMeal',
        json: true,
        method: 'POST',
        body: {
              id:req.body.id,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else{
            //resmain.render('../views/shop/index.ejs',);
            resmain.redirect('/');
        }

    });

}


// add ready meal
exports.postAddReadyMeal= (req,resmain,next) =>{
    
    console.log("i was here");
    const options = {
        url: 'http://localhost:3052/feeds/addReadyMeal',
        json: true,
        method: 'POST',
        body: {
              name:req.body.name,
              price:req.body.price,
              imageUrl:req.body.imageUrl,
              description:req.body.description,
              brand:req.body.brand,
              quantity:req.body.quantity,
              storeLocation:req.body.location,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Add Ready Meal successfully."){
            resmain.render('../views/admin/addReadyMeal',{
                addReadyMeal:"true",
                updateReadyMeal:"false",
                admin:localStorage.getItem('admin'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                unseenMessages:localStorage.getItem('unseenMessages'),
               
            });
        }
        else{
            resmain.render('../views/admin/addReadyMeal',{
                addReadyMeal:"false",
                updateReadyMeal:"false",
                admin:localStorage.getItem('admin'),
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
       
            });  
        }
    });
    
}


//fetch unseen messages 
exports.fetchMessages= (req,res,next) =>{
    localStorage.setItem('unseenMessages', 0);
    fetch('http://localhost:3052/feeds/fetchMessage')
    .then(response => {
        response.json().then(data => {
            console.log(data.messages);
            res.render('../views/admin/enquires',{
                messages:data.messages,
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
    
    
}

//fetch placed orderes
exports.fetchPlacedOrders= (req,res,next) =>{

    fetch('http://localhost:3052/feeds/fetchPlacedOrders')
    .then(response => {
        response.json().then(data => {
            console.log(data.orders);
            res.render('../views/admin/placedOrders',{
                orders:data.orders,
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
    
    
}
//fetch all orderes
exports.fetchAllOrders= (req,res,next) =>{

    fetch('http://localhost:3052/feeds/fetchAllOrders')
    .then(response => {
        response.json().then(data => {
            console.log(data.orders);
            res.render('../views/admin/allOrders',{
                orders:data.orders,
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
    
    
}


//post Placed Order
exports.postPlacedOrder= (req,resmain,next) =>{


        
    const options = {
        url: 'http://localhost:3052/feeds/placeOrder',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            totalPrice:req.body.totalPrice,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else{
            resmain.redirect('/');
        }

    });
    
    
}

//fetch all messages
exports.fetchAllMessages= (req,res,next) =>{
    
    fetch('http://localhost:3052/feeds/fetchAllMessage')
    .then(response => {
        response.json().then(data => {
            console.log(data.messages);
            res.render('../views/admin/enquires',{
                messages:data.messages,
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
    
    
}


// change order ready to true
exports.postOrderReady = (req,res,next) =>{
    
    const options = {
        url: 'http://localhost:3052/feeds/theOrderReady',
        json: true,
        body: {
            orderId: req.body.orderId
        }
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    });
  
    res.redirect('../admin/placedOrders');
}

// change order shipped to true
exports.postOrderShipped = (req,res,next) =>{
    
    const options = {
        url: 'http://localhost:3052/feeds/orderShipped',
        json: true,
        body: {
            orderId: req.body.orderId
        }
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    });
    res.redirect('/admin/placedOrders');
}

// change order arrived to true
exports.postOrderArrived = (req,res,next) =>{
    
    const options = {
        url: 'http://localhost:3052/feeds/orderArrived',
        json: true,
        body: {
            orderId: req.body.orderId
        }
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    });
    res.redirect('/admin/placedOrders');
}
