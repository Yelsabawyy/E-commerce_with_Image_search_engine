const Recipe = require('../models/recipes');
const Product = require('../models/product');

exports.getRecipesById=(req,res,next)=>{
    const id = req.body.id;
    console.log(id);
    Recipe.findById(id).then(recipe => {
        console.log(recipe);
      // used for ready meal page
      Product.find({'_id' : recipe.Products}).then(UsedProducts => {
        res.status(200).json({
          message: 'The ReadyMeal is Fetched successfully.',
          recipe: recipe,
          UsedProducts:UsedProducts
        });
    
        });  
      });  
}

exports.getRecipes=(req,res,next)=>{   
    Recipe.find().then(recipes => {
        res.status(200).json({
            message: 'The Deals Fetched successfully.',
            recipes: recipes,
          });
      });
  
  }