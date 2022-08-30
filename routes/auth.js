const express=require('express');
const authRouter=express.Router();
const authController=require('../controllers/auth');
authRouter.get('/',authController.getLogin)
authRouter.post("/admin/login",authController.postLogin)
authRouter.post("/logout",authController.postLogout)
authRouter.get("/signup",authController.getSignup)
authRouter.post("/admin/signup",authController.addUser)
module.exports=authRouter;