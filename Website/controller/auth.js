const request =require('request');

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const openSocket= require('socket.io-client');

const fetch = require('node-fetch');
const { body } = require('express-validator');


exports.register=(req,res,next)=>{
    
    res.render('../views/auth/register',{
        create:"",
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.login=(req,res,next)=>{
    
    res.render('../views/auth/login',{
        login:"",
        forgetPasswordCantFindEmail:"",
        forgetPassword:"",
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.forgetPassword=(req,res,next)=>{
    
    res.render('../views/auth/login',{
        login:"",
        forgetPassword:"true",
        forgetPasswordCantFindEmail:"",
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.myAccount=(req,res,next)=>{
    
    const url='http://localhost:3052/feeds/myAccount/'+ localStorage.getItem('token');
    fetch(url)
    .then(response => {
        response.json().then(data => {
            res.render('../views/auth/myAccount',{
                user:data.user,
                products:data.products,
                meals:data.meals, 
                cantChangePassword:"",
                cantChangeAddress:"",
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin'),
                
            });
        });
    })
    .catch(error => {
      console.log(error);
    });




   
}
exports.cart=(req,res,next)=>{
    const url='http://localhost:3052/feeds/cart/'+ localStorage.getItem('token');
    fetch(url)
    .then(response => {
        response.json().then(data => {
            res.render('../views/auth/cart',{
                products:data.products, 
                meals:data.meals, 
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



// send Message
exports.postSendMessage= (req,resmain,next) =>{
    
    const options = {
        url: 'http://localhost:3052/feeds/message',
        json: true,
        method: 'POST',
        body: {
              name:req.body.name,
              phone:req.body.phone,
              email:req.body.email,
              country:req.body.country,
              companyName:req.body.companyName,
              message:req.body.message,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Delivered successfully."){
            resmain.render('../views/shop/contactus',{
                delivered:"true",
                admin:localStorage.getItem('admin'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                unseenMessages:localStorage.getItem('unseenMessages'),
            });
        }
        else{
            resmain.render('../views/shop/contactus',{
                delivered:"false",
                admin:localStorage.getItem('admin')
            }); 
        }
    });

}

//post Register
exports.postRegister=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/register',
        json: true,
        method: 'POST',
        body: {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phone:req.body.phone,
            email:req.body.email,
            address:req.body.address,
            government:req.body.government,
            confirmpassword:req.body.confirmpassword,
            password:req.body.password,
            unseenMessages:localStorage.getItem('unseenMessages'),
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Create new Account successfully."){
            resmain.redirect('../auth/login')
        }
        else{
            console.log(req.body.government);
            resmain.render('../views/auth/register',{
                create:"false",
                message:body.message,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                phone:req.body.phone,
                email:req.body.email,
                address:req.body.address,
                government:req.body.government,
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                unseenMessages:localStorage.getItem('unseenMessages'),
                admin:localStorage.getItem('admin')
            }); 
        }
    });
}

//post login
exports.postLogin=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/login',
        json: true,
        method: 'POST',
        body: {
            email:req.body.email,
            password:req.body.password,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Logged In successfully."){

            localStorage.setItem('token', body.token);
            localStorage.setItem('admin', body.admin);

            // console.log("admin");
            // console.log(localStorage.getItem('admin'));
            

            resmain.redirect('../../');
        }
        else{
            console.log(req.body.government);
            resmain.render('../views/auth/login',{
                login:"false",
                forgetPassword:"",
                forgetPasswordCantFindEmail:"",
                email:req.body.email,
                message:body.message,
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                unseenMessages:localStorage.getItem('unseenMessages'),
                admin:localStorage.getItem('admin')
            }); 
        }
    });
}
//add product to cart
exports.postaddProductToCart=(req,resmain,next)=>{
    const options = {
        url: 'http://localhost:3052/feeds/addProductToCart',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
            productQty:req.body.productQty,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
   
    });

    
}
//add product to favourite
exports.postaddProductToFavourite=(req,resmain,next)=>{
    const options = {
        url: 'http://localhost:3052/feeds/addProductToFavourite',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        
    });
}

//add product to favourite
exports.postremoveProductToFavourite=(req,resmain,next)=>{
    const options = {
        url: 'http://localhost:3052/feeds/removeProductToFavourite',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        
    });
}


//add meal to favourite
exports.postaddMealToFavourite=(req,resmain,next)=>{
    const options = {
        url: 'http://localhost:3052/feeds/addMealToFavourite',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        
    });
}

//remove meal to favourite
exports.postremoveMealToFavourite=(req,resmain,next)=>{
    const options = {
        url: 'http://localhost:3052/feeds/removeMealToFavourite',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }

        
    });
}
//update product to cart
exports.postupdateProductToCart=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/updateProductToCart',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
            productQty:req.body.productQty,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Product Added To Cart Successfully"){
           
            // res.redirect(req.get('referer'));
        }
        
    });
}

//update product to cart
exports.postupdateMealToCart=(req,resmain,next)=>{

    const options = {
        url: 'http://localhost:3052/feeds/updateMealToCart',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
            productQty:req.body.productQty,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Product Added To Cart Successfully"){
           
            // res.redirect(req.get('referer'));
        }
        
    });
}

//delete product to cart
exports.postdeleteProductFromCart=(req,resmain,next)=>{
    const options = {
        url: 'http://localhost:3052/feeds/deleteProductFromCart',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
        }
        
    };
    
    request.post(options, (err, res, body) => {

        if (err) {
            return console.log(err);
        }
        
        
        else if(body.message==="Delete from Cart."){
            
        }
        
    }
    
    
    );
}


//delete Meal to cart
exports.postdeleteMealFromCart=(req,resmain,next)=>{
    const options = {
        url: 'http://localhost:3052/feeds/deleteMealFromCart',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
        }
        
    };
    
    request.post(options, (err, res, body) => {

        if (err) {
            return console.log(err);
        }
        
        
        else if(body.message==="Delete from Cart."){
            
        }
        
    }
    
    
    );
}


//add Meal to cart
exports.postaddMealToCart=(req,resmain,next)=>{
    const options = {
        url: 'http://localhost:3052/feeds/addMealToCart',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            id:req.body.id,
            productQty:req.body.productQty,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Meal Added To Cart Successfully"){
            
            res.redirect(req.get('referer'));
        }
        
    });
}

//post forgetPassword
exports.postforgetPassword=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/forgetPassword',
        json: true,
        method: 'POST',
        body: {
            email:req.body.email,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="Email Found"){
            console.log(body.email);
            console.log(body.randomString);
            resmain.render('../views/auth/changePassword',{
                email:body.email,
                randomString:body.randomString,
                cantChange:"",
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            }); 
        }
        else{
            console.log(req.body.government);
            resmain.render('../views/auth/forgetPassword',{
                login:"",
                forgetPassword:"true",
                forgetPasswordCantFindEmail:"true",
                message:body.message,
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            }); 
        }
    });
}


//post changePassword
exports.postchangePassword=(req,resmain,next)=>{
    const options = {
        url: 'http://localhost:3052/feeds/forgetPasswordChangePassword',
        json: true,
        method: 'POST',
        body: {
            email:req.body.email,
            randomString:req.body.randomString,
            code:req.body.code,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword,
            admin:localStorage.getItem('admin')
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="change Password!!"){
            resmain.redirect('../auth/login');
        }
        else{

            resmain.render('../views/auth/changePassword',{
                cantChange:"true",
                message:body.message,
                randomString:req.body.randomString,
                email:req.body.email,
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                unseenMessages:localStorage.getItem('unseenMessages'),
                admin:localStorage.getItem('admin')
            }); 
        }
    });
}

//post changePasswordFromMyAccount
exports.postchangePasswordFromMyAccount=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/changePasswordFromMyAccount',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            oldPassword:req.body.oldPassword,
            password:req.body.password,
            totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
            confirmPassword:req.body.confirmPassword,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="change Password!!"){
            resmain.redirect('../../');
        }
        else{
            console.log(body.user)
            resmain.render('../views/auth/myAccount',{
                cantChangePassword:"true",
                cantChangeAddress:"",
                message:body.message,
                user:body.user,
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                unseenMessages:localStorage.getItem('unseenMessages'),
                admin:localStorage.getItem('admin')
            }); 
        }
    });
}

//post changeAddressFromMyAccount
exports.postchangeAddressFromMyAccount=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/changeAddressFromMyAccount',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            address:req.body.address,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="change Address!!"){
            resmain.redirect('../../');
        }
        else{
            console.log(body.user)
            resmain.render('../views/auth/myAccount',{
                cantChangePassword:"",
                cantChangeAddress:"true",
                message:body.message,
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                user:body.user,
                unseenMessages:localStorage.getItem('unseenMessages'),
                admin:localStorage.getItem('admin')
            }); 
        }
    });
}

// logout
exports.postLogout=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/logout',
        json: true,
        method: 'POST',
        body: {
            token:req.body.email,
            password:req.body.password,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="logout"){
            console.log("yes");
            localStorage.setItem('token', null);
            localStorage.setItem('admin', null);
            localStorage.setItem('totalPrice', null);
            localStorage.setItem('cartQuantity', null);
            localStorage.setItem('unseenMessages', null);
            resmain.redirect('../../');        
        }
        else{
            console.log("no");
            resmain.redirect('../../');  
        }
    });
}


// comment 
//post changeAddressFromMyAccount
exports.leaveComment=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/pushComment',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            productId:req.body.productId,
            comment:req.body.comment,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="add Comment successfully."){
            
        }
        
    });
}
//post changeAddressFromMyAccount
exports.leaveMealComment=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/pushMealComment',
        json: true,
        method: 'POST',
        body: {
            token:localStorage.getItem('token'),
            productId:req.body.productId,
            comment:req.body.comment,
        }
        
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        else if(body.message==="add Comment successfully."){
            
        }
        
    });
}