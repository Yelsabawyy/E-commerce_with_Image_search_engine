const express = require('express');
const fetch = require('node-fetch');
const request =require('request');

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const openSocket= require('socket.io-client');


exports.homePage=(req,res,next)=>{
   // res.render('../views/shop/index.ejs');

    fetch('http://localhost:3052/feeds/index')
    .then(response => {
        response.json().then(data => {
            res.render('../views/shop/index.ejs',{                
                deals: data.deals,
                readyMeals:data.readyMeals,
                snacks:data.snacks,
                admin:localStorage.getItem('admin'),
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
            });
        });
    })
    .catch(error => {
      console.log(error);
    });

    
}
exports.faqs=(req,res,next)=>{
    
    res.render('../views/shop/FAQs.ejs',{
        admin:localStorage.getItem('admin'),
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
    });
}

exports.contactus=(req,res,next)=>{
    
    res.render('../views/shop/contactUs.ejs',{
        delivered:"",
        admin:localStorage.getItem('admin'),
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
    });
}
exports.help=(req,res,next)=>{
    
    res.render('../views/shop/help.ejs',{
        admin:localStorage.getItem('admin'),
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
    });
}
exports.product=(req,res,next)=>{
    
    res.render('../views/shop/product.ejs',{
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.productsResults=(req,res,next)=>{
    
    res.render('../views/shop/productsResult.ejs',{
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.recipe=(req,res,next)=>{
    
    res.render('../views/shop/recipe.ejs',{
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.recipesResults=(req,res,next)=>{
    
    res.render('../views/shop/recipesResults.ejs',{
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.storeLocation=(req,res,next)=>{
    
    res.render('../views/shop/storeLocation.ejs',{
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.trackOrder=(req,res,next)=>{
    
    res.render('../views/shop/trackOrder.ejs',{
        message:"",
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
        cartQuantity:localStorage.getItem('cartQuantity'),
        placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.trackOrderResults=(req,res,next)=>{
    
    res.render('../views/shop/trackOrderResults.ejs',{
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
        cartQuantity:localStorage.getItem('cartQuantity'),
        placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}
exports.about=(req,res,next)=>{
    
    res.render('../views/shop/about.ejs',{
        unseenMessages:localStorage.getItem('unseenMessages'),
        totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
        admin:localStorage.getItem('admin')
    });
}

// fetch Deals
exports.getDeals = (req, res, next) => {
    
    
    const sort=req.query.sort;
    const filter=req.query.filter;  
    console.log("reach front end");
    const url='http://localhost:3052/feeds/fetchDeals'+'/sort/' + sort + '/filter/' +filter ;
    fetch(url)
    .then(response => {
        response.json().then(data => {
            res.render('../views/shop/productsResult.ejs',{                
                products: data.products,
                brandkey: data.brandkey,
                brandvalue: data.brandvalue,
                search:"false",
                readyMeal:"false",
                category:"false",
                subcategory:"false",
                deals:"true",
                searchResult:"",
                sortType:data.sortType,
                filter:data.filter,
                admin:localStorage.getItem('admin'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                unseenMessages:localStorage.getItem('unseenMessages'),
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
}
//fetch readyMeals
exports.getReadyMeals = (req, res, next) => { 
     
    const sort=req.query.sort;
    const filter=req.query.filter;

    console.log("reach front end");
    const url='http://localhost:3052/feeds/fetchReadyMeals'+'/sort/' + sort + '/filter/' +filter ;
    fetch(url)
    .then(response => {
        response.json().then(data => {
            res.render('../views/shop/productsResult.ejs',{                
                products: data.products,
                brandkey: data.brandkey,
                brandvalue: data.brandvalue,
                search:"false",
                category:"false",
                subcategory:"false",
                deals:"false",
                readyMeal:"true",
                searchResult:"",
                sortType:data.sortType,
                admin:localStorage.getItem('admin'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                filter:data.filter,
                unseenMessages:localStorage.getItem('unseenMessages'),
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
}


exports.getProductById = (req, resmain, next) => { 
    
    
    
    const options = {
        url: 'http://localhost:3052/feeds/fetchProductById',
        json: true,
        body: {
               id:req.params.productId,
        },
        
    };

    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log("check");
        console.log(body);
        resmain.render('../views/shop/product.ejs',{
            product:body.product,
            similarProducts:body.similarProducts,
            unseenMessages:localStorage.getItem('unseenMessages'),
            totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
            admin:localStorage.getItem('admin'),
            readyMeal:"false"           
        });
        

    });












}

exports.getReadyMealById = (req, resmain, next) => { 
    
    
    const options = {
        url: 'http://localhost:3052/feeds/fetchReadyMealById',
        json: true,
        body: {
               id:req.params.productId,
        },
        
    };

    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log("check");
        console.log(body);
        resmain.render('../views/shop/product.ejs',{
            similarProducts:body.similarProducts,
            product:body.product,  
            readyMeal:"true",
            admin:localStorage.getItem('admin'), 
            unseenMessages:localStorage.getItem('unseenMessages'),
            totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),          
        });
        

    });












}

exports.getRecipeById = (req, resmain, next) => { 
    
    
    const options = {
        url: 'http://localhost:3052/feeds/fetchRecipeById',
        json: true,
        body: {
               id:req.params.recipeId,
        },
        
    };

    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log("check");
        console.log(body.recipe);
        resmain.render('../views/shop/recipe.ejs',{
            products:body.UsedProducts,
            recipe:body.recipe,
            unseenMessages:localStorage.getItem('unseenMessages'),
            totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
            admin:localStorage.getItem('admin'),            
        });
        

    });












}

// fetch Recipes
exports.getRecipes = (req, res, next) => {
    
    const url='http://localhost:3052/feeds/fetchRecipes';
    fetch(url)
    .then(response => {
        response.json().then(data => {
            console.log(data.recipes)
            res.render('../views/shop/recipesResults.ejs',{                
                recipes: data.recipes,
                admin:localStorage.getItem('admin'),
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
}


// add search Category
exports.searchCategory= (req,resmain,next) =>{
    
    console.log(req.body);
    const search=req.params.search;
    const sort=req.query.sort;
    const filter=req.query.filter;
    const url='http://localhost:3052/feeds/searchCategory/' + search  +'/sort/' + sort + '/filter/' +filter ;
    fetch(url)
    .then(response => {
        response.json().then(data => {
            resmain.render('../views/shop/productsResult.ejs',{                
                products: data.products,
                brandkey: data.brandkey,
                brandvalue: data.brandvalue,
                search: "false",
                deals:"false",
                category:"true",
                subcategory:"false",
                readyMeal:"false",
                searchResult:data.searchQuery,
                sortType:data.sortType,
                filter:data.filter ,
                admin:localStorage.getItem('admin'),    
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                unseenMessages:localStorage.getItem('unseenMessages'),      
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
    
}


// add search sub Category
exports.searchSubCategory= (req,resmain,next) =>{
    
    console.log(req.body);
    const search=req.params.search;
    const sort=req.query.sort;
    const filter=req.query.filter;
    const url='http://localhost:3052/feeds/searchSubCategory/' + search  +'/sort/' + sort + '/filter/' +filter ;
    fetch(url)
    .then(response => {
        response.json().then(data => {
            resmain.render('../views/shop/productsResult.ejs',{                
                products: data.products,
                brandkey: data.brandkey,
                brandvalue: data.brandvalue,
                search: "false",
                category:"false",
                subcategory:"true",
                deals:"false",
                readyMeal:"false",
                searchResult:data.searchQuery,
                sortType:data.sortType,
                filter:data.filter ,
                admin:localStorage.getItem('admin'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                unseenMessages:localStorage.getItem('unseenMessages'),           
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
    
}

//search
exports.search=(req,resmain,next)=>{
    
    const search=req.query.search;
    const sort=req.query.sort;
    const filter=req.query.filter;
    const url='http://localhost:3052/feeds/search/' + search +'/sort/' + sort + '/filter/' +filter ;
    fetch(url)
    .then(response => {
        response.json().then(data => {
            console.log("filter");
            console.log(data.sortType);
            resmain.render('../views/shop/productsResult.ejs',{                
                products: data.products,
                brandkey: data.brandkey,
                brandvalue: data.brandvalue,
                search: "true",
                deals:"false",
                readyMeal:"false",
                category:"false",
                subcategory:"false",
                searchResult:data.searchQuery,
                sortType:data.sortType,
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                filter:data.filter,
                admin:localStorage.getItem('admin'),
                unseenMessages:localStorage.getItem('unseenMessages'),
                
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
    
  }  

  exports.postTrackOrder=(req,resmain,next)=>{
    
    const options = {
        url: 'http://localhost:3052/feeds/postTrackOrder',
        json: true,
        body: {
               orderId:req.body.orderId,
        },
        
    };

    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        if(body.message==="order is not found"){
            resmain.render('../views/shop/trackOrder.ejs',{
                message:body.message,
                unseenMessages:localStorage.getItem('unseenMessages'),
                totalPrice:localStorage.getItem('totalPrice'),
                cartQuantity:localStorage.getItem('cartQuantity'),
                placedOrder:localStorage.getItem('placedOrder'),
                admin:localStorage.getItem('admin')
            });
        }
        console.log("check");
        console.log(body);
        resmain.render('../views/shop/trackOrderResult.ejs',{
            order:body.order,
            products:body.products,
            meals:body.meals,
            unseenMessages:localStorage.getItem('unseenMessages'),
            totalPrice:localStorage.getItem('totalPrice'),
            cartQuantity:localStorage.getItem('cartQuantity'),
            placedOrder:localStorage.getItem('placedOrder'),
            admin:localStorage.getItem('admin')
        });
    });
}