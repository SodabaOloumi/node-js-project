const express=require('express');
const clientRouter=express.Router();
const clientController=require('../controllers/client');
clientRouter.get("/clientAllCourses",clientController.allCourses)
clientRouter.post("/courseStudent",clientController.allStudent)
clientRouter.post("/addLesson",clientController.addLesson)
clientRouter.get("/getLessons",clientController.allLesson)
module.exports=clientRouter;