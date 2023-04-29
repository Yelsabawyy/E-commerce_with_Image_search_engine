const express=require('express');
const router=express.Router();

const bodyParser=require('body-parser');

const authController =require('../controller/auth');

const is_login=require('../middleware/is-login');
const should_login=require('../middleware/should-login');

router.use(bodyParser.urlencoded({extended:true}));

//get
router.get('/register',is_login,authController.register);
router.post('/register',is_login,authController.postRegister);
router.get('/login',is_login,authController.login);
router.post('/login',is_login,authController.postLogin);
router.get('/cart',should_login,authController.cart);
router.get('/myAccount',should_login,authController.myAccount);
router.get('/forgetPassword',authController.forgetPassword);
router.post('/forgetPassword',authController.postforgetPassword);
router.post('/changePassword',authController.postchangePassword);

router.post('/changePasswordFromMyAccount',should_login,authController.postchangePasswordFromMyAccount);
router.post('/changeAddressFromMyAccount',should_login,authController.postchangeAddressFromMyAccount);


router.post('/addProductToCart',is_login,authController.postaddProductToCart);

router.post('/addProductToFavourite',is_login,authController.postaddProductToFavourite);
router.post('/addMealToFavourite',is_login,authController.postaddMealToFavourite);

router.post('/removeProductToFavourite',is_login,authController.postremoveProductToFavourite);
router.post('/removeMealToFavourite',is_login,authController.postremoveMealToFavourite);

router.post('/updateProductToCart',is_login,authController.postupdateProductToCart);
router.post('/deleteProductFromCart',is_login,authController.postdeleteProductFromCart);

router.post('/addMealToCart',is_login,authController.postaddMealToCart);
router.post('/deleteMealFromCart',is_login,authController.postdeleteMealFromCart);
router.post('/updateMealToCart',is_login,authController.postupdateMealToCart);

router.post('/leaveComment',is_login,authController.leaveComment);
router.post('/leaveMealComment',is_login,authController.leaveMealComment);

router.post('/logout',authController.postLogout);

//post
router.post('/message',authController.postSendMessage);


module.exports=router;