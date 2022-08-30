const express=require('express');
const adminRouter=express.Router();
const adminController=require('../controllers/admin');
adminRouter.get('/add-student',adminController.getForm)
adminRouter.post('/addStudent',adminController.addStudent)
adminRouter.get('/all-students',adminController.allStudent)
adminRouter.post('/getEditStudent', adminController.getEditStudent)
adminRouter.post('/editStudent', adminController.postEditStudent)
adminRouter.post('/deleteStudent',adminController.postDeleteStudent);
adminRouter.post("/studentDetails",adminController.getProfileStudent)
//  end student 
//  course
adminRouter.get('/add-course',adminController.courseForm)
adminRouter.post('/addCourse',adminController.addCourse)
adminRouter.get("/all-courses",adminController.allCouses)
adminRouter.post("/deleteCourse",adminController.postDeleteCourse)
adminRouter.post('/getEditCourse', adminController.getEditCourse)
adminRouter.post('/editCourse', adminController.postEditCourse)

// end course
// professore
adminRouter.get("/add-professor",adminController.professorForm)
adminRouter.post("/addProfessor",adminController.addProfessor)
adminRouter.get("/all-professor",adminController.allProfessor)
adminRouter.post("/deleteProfessor", adminController.postDeleteProfessor)
adminRouter.post("/getEditProfessor",adminController.getEditProfessor)
adminRouter.post("/editProfessor",adminController.postEditProfessor)
adminRouter.post("/detials",adminController.getProfileProfessor)

module.exports=adminRouter;