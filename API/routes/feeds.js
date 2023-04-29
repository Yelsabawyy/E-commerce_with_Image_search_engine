const express=require('express');
const router=express.Router();


const cartController =require('../controllers/cart');
const messagesController =require('../controllers/messages');
const productsController =require('../controllers/products');
const recipesController =require('../controllers/recipes');
const userController =require('../controllers/user');

const is_auth=require('../middlewares/is-auth');





router.post('/register',userController.register);

router.post('/login',userController.login);

router.post('/logout',userController.logout);

router.post('/addProductToCart',is_auth,userController.addProductToCart);
router.post('/addProductToFavourite',is_auth,userController.addProductToFavourite);

router.post('/updateProductToCart',is_auth,userController.updateProductToCart);
router.post('/deleteProductFromCart',is_auth,userController.deleteProductToCart);

router.post('/deleteMealFromCart',is_auth,userController.deleteMealToCart);
router.post('/updateMealToCart',is_auth,userController.updateMealToCart);

router.post('/addMealToCart',is_auth,userController.addMealToCart);
router.post('/addMealToFavourite',is_auth,userController.addMealToFavourite);

router.post('/removeProductToFavourite',is_auth,userController.removeProductToFavourite);
router.post('/removeMealToFavourite',is_auth,userController.removeMealToFavourite);

router.get('/myAccount/:token',is_auth,userController.myAccount);

router.get('/cart/:token',is_auth,userController.getCart);

router.post('/changePasswordFromMyAccount',is_auth,userController.changePasswordFromMyAccount);

router.post('/changeAddressFromMyAccount',is_auth,userController.changeAddressFromMyAccount);

router.post('/forgetPassword',userController.forgetPassword);

router.post('/forgetPasswordChangePassword',userController.forgetPasswordChangePassword);

router.get('/index',productsController.fetchIndexPage);

router.post('/addProduct',productsController.addProduct);

router.post('/updateProduct',productsController.updateProduct);

router.post('/updateReadyMeal',productsController.updateReadyMeal);

router.post('/deleteProduct',productsController.deleteProduct);

router.post('/deleteReadyMeal',productsController.deleteReadyMeal);

router.post('/addReadyMeal',productsController.addReadyMeal);

router.post('/message',messagesController.sendMessage);

router.get('/fetchMessage',messagesController.fetchMessage);

router.get('/fetchAllMessage',messagesController.fetchAllMessage);

router.get('/fetchDeals/sort/:sort/filter/:filter',productsController.getDeals);

router.get('/fetchRecipes',recipesController.getRecipes);

router.get('/fetchReadyMeals/sort/:sort/filter/:filter',productsController.getReadyMeals);

router.post('/fetchProductById',productsController.getProductById);

router.post('/fetchReadyMealById',productsController.getReadyMealById);

router.post('/fetchRecipeById',recipesController.getRecipesById);

router.get('/search/:search/sort/:sort/filter/:filter',productsController.postSearch);

router.get('/searchCategory/:search/sort/:sort/filter/:filter',productsController.postSearchCategory);

router.get('/searchSubCategory/:search/sort/:sort/filter/:filter',productsController.postSearchSubCategory);

router.post('/pushComment',is_auth,productsController.pushComment)
router.post('/pushMealComment',is_auth,productsController.pushMealsComment)

router.post('/placeOrder',is_auth,productsController.placeOrder)
router.get('/fetchPlacedOrders',productsController.fetchPlacedOrders)
router.get('/fetchAllOrders',productsController.fetchAllOrders)

router.post('/theOrderReady',productsController.readyTrue);
router.post('/orderShipped',productsController.shippedTrue);
router.post('/orderArrived',productsController.arrivedTrue);

router.post('/postTrackOrder',productsController.postTrackOrder);

// router.post('/deleteProduct',feedController.deleteProductById);


module.exports = router;