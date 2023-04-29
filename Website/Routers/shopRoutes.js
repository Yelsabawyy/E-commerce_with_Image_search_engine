const express=require('express');
const router=express.Router();

const bodyParser=require('body-parser');

const shopController =require('../controller/shop');

router.use(bodyParser.urlencoded({extended:true}));

router.get('/',shopController.homePage);
router.get('/home',shopController.homePage);
router.get('/about',shopController.about);
router.get('/FAQs',shopController.faqs);
router.get('/help',shopController.help);
router.get('/product',shopController.product);
router.get('/productResults',shopController.productsResults);
router.get('/recipe',shopController.recipe);
router.get('/recipesResults',shopController.recipesResults);
router.get('/recipesResults',shopController.contactus);
router.get('/contactus',shopController.contactus);
router.get('/trackOrder',shopController.trackOrder);
router.get('/storeLocation',shopController.storeLocation);

router.post('/trackOrder',shopController.postTrackOrder);

router.get('/trackOrderResults',shopController.trackOrderResults);



router.get('/searchCategory/:search',shopController.searchCategory);
router.get('/searchSubCategory/:search',shopController.searchSubCategory);

router.get('/getDeals',shopController.getDeals);
router.get('/getRecipes',shopController.getRecipes);
router.get('/readyMeals',shopController.getReadyMeals);
router.get('/getProductById/:productId',shopController.getProductById);
router.get('/getRecipeById/:recipeId',shopController.getRecipeById);
router.get('/getReadyMealById/:productId',shopController.getReadyMealById);

router.get('/search',shopController.search);


module.exports=router;