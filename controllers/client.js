const Course = require("../model/courses")
const Student = require('../model/students')
const Lesson = require("../model/lessons")
exports.allCourses=(req,res)=>{

    const courses = Course.find({deleted:0})
    .populate("professorId","firstName , email")
    
    courses.then((courses)=>{
        console.log(req.session.user)
            res.render('client/professor/all-courses',{
                path:'/clientAllCourses',
                courses:courses,
                title:"Professor All Courses",
                isAuthenticated:req.session.isLoggedIn,
                isUser:req.session.user
            })

        }) 
  }

exports.allStudent=(req,res)=>{
    const id = req.body.courseId;
    console.log(id)
    Student.find({deleted:0 , courseId : id })
    .populate("courseId","courseName")
    .then((students)=>{
        res.render('client/professor/all-students',{
            path:'/all-students',
            students:students,
            title:"All Students p",
            isAuthenticated:req.session.isLoggedIn
        })
    }) 
    
    
    
    }  
exports.addLesson = (req,res)=>{
        const lessonName = req.body.name;
        const description= req.body.description;
        const courseId= req.body.courseId
        const image =req.file
        const imageUrl = image.path
     
         const lesson= new Lesson({
            lessonName:lessonName,
            description:description,
            courseId:courseId,
            imageUrl:imageUrl,
             
        });
        lesson.save() 
         .then(()=>{
          console.log('lesson added');
        
         
        })
        .catch(err =>{
          console.log(err);
        })
      
      } 
exports.allLesson=(req,res)=>{

        const lessons = Lesson.find({deleted:0})
        .populate("courseId","courseName")
        lessons.then((lessons)=>{
                res.render('client/professor/all-lessons',{
                    path:'/all-students',
                    lessons:lessons,
                    title:"All Lessons",
                    isAuthenticated:req.session.isLoggedIn
                })
            }) 
        
          
       
        
    }      
