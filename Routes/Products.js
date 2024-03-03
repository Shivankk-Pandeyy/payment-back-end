const express=require('express');
const router=express.Router();
//GET FUNCTION CALL FROM CONTROLLERS
const {getAllProducts,userRegister,userLogin,orderCheckout,getAllUsers,addToCart,getCartItems,removeCart,ValidateOrder,ItemsPurchased,GetPlans,DeleteMyPlan}=require('../Controllers/Products');
//RESTFUL APIs
router.route("/").get(getAllProducts);
router.route("/AllUsers").get(getAllUsers);
router.route('/Register').post(userRegister);
router.route('/Login').post(userLogin);
router.route("/AddToCart").post(addToCart);
router.route("/CartList").get(getCartItems);
router.route("/RemoveCart/:id").delete(removeCart);
router.route("/ItemsPurchased").post(ItemsPurchased);
router.route("/GetPlans").get(GetPlans);
router.route("/DeletePlan/:id").delete(DeleteMyPlan)
router.route('/Order').post(orderCheckout) ;
router.route("/ValidateOrder").post(ValidateOrder);
module.exports=router;