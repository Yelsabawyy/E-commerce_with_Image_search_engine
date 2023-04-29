const bodyParser=require('body-parser');
const express=require('express');
const router=express.Router();

const adminController =require('../controller/admin');

const is_admin=require('../middleware/is-admin');

router.use(bodyParser.urlencoded({extended:true}));

//get pages
router.get('/addnewbranch',is_admin,adminController.addnewbranch);
router.get('/addproduct',is_admin,adminController.addproduct);
router.get('/enquires',is_admin,adminController.fetchMessages);
router.get('/allEnquires',is_admin,adminController.fetchAllMessages);
router.get('/addreadymeal',is_admin,adminController.addReadyMeal);

router.get('/placedOrders',is_admin,adminController.fetchPlacedOrders);
router.get('/allOrders',is_admin,adminController.fetchAllOrders);
router.post('/placedOrder',is_admin,adminController.postPlacedOrder);


//post pages
router.post('/addproduct',adminController.postAddProducts);
router.post('/addReadyMeal',adminController.postAddReadyMeal);
router.post('/updateForm',adminController.updateForm);
router.post('/updateFormReadyMeals',adminController.updateFormReadyMeals);
router.post('/updateProduct',adminController.postUpdateProduct);
router.post('/updateReadyMeal',adminController.postupdateReadyMeal);
router.post('/deleteProduct',adminController.postDeleteProduct);
router.post('/deleteReadyMeal',adminController.postdeleteReadyMeal);




router.post('/orderReady',adminController.postOrderReady);
router.post('/orderShipped',adminController.postOrderShipped);
router.post('/orderArrived',adminController.postOrderArrived);

module.exports=router;