const Student = require('../model/students')
 const Course = require("../model/courses")
 const Professor = require("../model/professors")


// student methodes

exports.getForm=(req,res)=>{
  Course.find({deleted:0 },"courseName")
  .then(courses =>{
    res.render('admin/add-student',{
      path:'/add-student',
      editing:false,
      student: null,
      title:"Add Student",
      courses:courses,
      isAuthenticated:req.session.isLoggedIn
    
  });
  })
   
    
}
exports.addStudent = (req,res)=>{
    const firstName = req.body.name;
    const address= req.body.add;
    const mobileno= req.body.mobileNum;
    const date=req.body.finish;
    const postcode  = req.body.postC;
    const courseId =req.body.department
    const description = req.body.description;
    const gender= req.body.gender;
    const email= req.body.email;
    const urlF= req.body.urlFace;
    const urlT=req.body.urlTwitter;
    const urlG  = req.body.urlGoogle;
    const image =req.file
    const imageUrl = image.path
    console.log(address,firstName, email, urlF, courseId)
     const student= new Student({
        firstName:firstName,
        address:address,
        mobileno:mobileno,
        date:date,
        postcode:postcode,
        imageUrl:imageUrl,
        courseId:courseId,
        description:description,
        gender:gender,
        email:email,
        urlF:urlF,
        urlT:urlT,
        urlG:urlG,  
    });
     student.save() 
    
  
    .then((student)=>{
      console.log('student added');
      res.redirect('/all-students')
     
    })
    .catch(err =>{
      console.log(err);
    })

  }
  exports.allStudent=(req,res)=>{

    const students = Student.find({deleted:0})
    .populate("courseId","courseName")
    students.then((students)=>{
            res.render('admin/all-students',{
                path:'/all-students',
                students:students,
                title:"All Students",
                isAuthenticated:req.session.isLoggedIn
            })
        }) 
    
      
   
    
}

exports.getEditStudent=(req,res)=>{
  const id= req.body.studentId;
  console.log(id)
   Student.findById(id)
   .then(student => {
    res.render('admin/add-student',{
      editing:true,
      student:student,
      title:"Edit Student",
      isAuthenticated:req.session.isLoggedIn
    })
   })
  .catch(err =>{
    console.log(err);
  })
}

exports.postEditStudent=(req,res)=>{
    const id = req.body.studentId
    const firstName = req.body.name;
    const address= req.body.add;
    const mobileno= req.body.mobileNum;
    const date=req.body.finish;
    const postcode  = req.body.postC;
    const department =req.body.department
    const description = req.body.description;
    const gender= req.body.gender;
    const email= req.body.email;
    const urlF= req.body.urlFace;
    const urlT=req.body.urlTwitter;
    const urlG  = req.body.urlGoogle;
    const image =req.file
    const imageUrl = (image)? image.path : req.body.currentImage
    console.log(imageUrl, id, email, gender, mobileno , date, department , firstName)
    Student.findById(id)
    .then(student=>{
      if(!student){
        res.redirect('/all-students');
      }
      student.firstName = firstName;
      student.address= address;
      student.mobileno= mobileno;
      student.date=date;
      student.postcode  = postcode;
      student.department =department
      student.description = description;
      student.gender= gender;
      student.email= email;
      student.urlF= urlF;
      student.urlT=urlT;
      student. urlG  = urlG;
      student.imageUrl = imageUrl;
      student.save()
      console.log('student Edited');
      res.redirect('/all-students')
    })
    .catch(err=> console.log(err));



}
exports.postDeleteStudent=(req,res)=>{
  const id = req.body.studentId;
  console.log(id)
  Student.findById(id)
  .then((student)=>{
    student.deleted = 1
    student.save()
    res.redirect('/all-students')
    console.log("deleted")
  })
 

}
exports.getProfileStudent=(req,res)=>{
  const id = req.body.studentId;
  console.log(id)
  Student.findById(id)
  .then((student)=>{
    res.render('admin/professor-profile',{
      student:student,
      professor:null,
      title:"Student Profile",
      isAuthenticated:req.session.isLoggedIn
      
    })
    console.log(Professor.findById(id))
  })
  
  
  }

// end student methodes
//  start courses methodes
exports.courseForm=(req,res)=>{

  Professor.find({deleted:0 },"firstName")
  .then(professors =>{
    res.render('admin/add-course',{
      path:'/add-course',
      editing:false,
      course: null,
      title:"Add Course",
      professors:professors,
      isAuthenticated:req.session.isLoggedIn
    
  });
  })
  
  
}

exports.addCourse = (req,res)=>{
  const courseName = req.body.name;
  const courseStartDate= req.body.dateStart;
  const courseDuration= req.body.courseD;
  const department =req.body.departmentC
  const description = req.body.descriptionC;
  const professorId= req.body.professorId;
  const year= req.body.yearC;
  const image =req.file
  const imageUrl = image.path
  console.log(courseDuration,year, courseName, department)
   const course= new Course({
      courseName:courseName,
      courseStartDate:courseStartDate,
      courseDuration:courseDuration,
      imageUrl:imageUrl,
      department:department,
      description:description,
      professorId:professorId,
      year:year,
       
  });
  course.save() 
   .then(()=>{
    console.log('course added');
    res.redirect("/all-courses")
   
  })
  .catch(err =>{
    console.log(err);
  })

}
exports.allCouses=(req,res)=>{

  const courses = Course.find({deleted:0})
  .populate("professorId","firstName")
  
  courses.then((courses)=>{
          res.render('admin/all-courses',{
              path:'/all-courses',
              courses:courses,
              title:"All Courses",
              isAuthenticated:req.session.isLoggedIn
          })
      }) 
}

exports.getEditCourse=(req,res)=>{
    const id= req.body.cId;
    Professor.find({deleted:0 },"firstName")
    .then(professors =>{
      Course.findById(id)
      .then(course => {
        res.render('admin/add-course',{
         editing:true,
         course:course,
         professors:professors,
         title:"Edit Course",
         isAuthenticated:req.session.isLoggedIn
      })
     })
    })
 
.catch(err =>{
  console.log(err);
})
  
}

exports.postEditCourse=(req,res)=>{
  const courseName = req.body.name;
  const courseStartDate= req.body.dateStart;
  const courseDuration= req.body.courseD;
  const department =req.body.departmentC
  const description = req.body.descriptionC;
  const professorId= req.body.professorId;
  const year= req.body.yearC;

  const id= req.body.courseId
  const image =req.file
  const imageUrl = (image)? image.path : req.body.currentImage
  Course.findById(id)
  .then(course=>{
    if(!course){
      res.redirect('/all-courses');
    }
    course.courseName = courseName;
    course.courseStartDate= courseStartDate;
    course.courseDuration= courseDuration;
    course.department =department
    course.description = description;
    course.professorId=professorId;
    course.year  = year;
    course.imageUrl = imageUrl;
    course.save()
    console.log('course Edited');
    res.redirect('/all-courses')
  })
  .catch(err=> console.log(err));



}
exports.postDeleteCourse=(req,res)=>{
const id = req.body.courseId;
console.log(id)
Course.findById(id)
.then((course)=>{
  course.deleted = 1
  course.save()
  res.redirect('/all-courses')
  console.log("deleted")
})


}
// end cours methode

// professors or teacher methodes
exports.professorForm=(req,res)=>{
  res.render('admin/add-professor',{
      path:'/add-professor',
      editing:false,
      professor: null,
      title:"Add Professor",
      isAuthenticated:req.session.isLoggedIn
    
  });
  
}
exports.addProfessor = (req,res)=>{
  const firstName = req.body.name;
  const address= req.body.add;
  const mobileno= req.body.mobileNum;
  const date=req.body.finish;
  const postcode  = req.body.postC;
  const department =req.body.department
  const description = req.body.description;
  const gender= req.body.gender;
  const email= req.body.email;
  const urlF= req.body.urlFace;
  const urlT=req.body.urlTwitter;
  const urlG  = req.body.urlGoogle;
  const image =req.file
  const imageUrl = image.path
  console.log(address,firstName, email, urlF, department)
   const professor= new Professor({
      firstName:firstName,
      address:address,
      mobileno:mobileno,
      date:date,
      postcode:postcode,
      imageUrl:imageUrl,
      department:department,
      description:description,
      gender:gender,
      email:email,
      urlF:urlF,
      urlT:urlT,
      urlG:urlG,  
  });
   professor.save() 
  

  .then((professor)=>{
    console.log('professor added');
    res.redirect('/all-professor')
   
  })
  .catch(err =>{
    console.log(err);
  })

}

exports.allProfessor=(req,res)=>{

  const professors = Professor.find({deleted:0})
  
  professors.then((professors)=>{
          res.render('admin/all-professors',{
              path:'/all-students',
              professors:professors,
              title:"All Professor",
              isAuthenticated:req.session.isLoggedIn
          })
      }) 
  
    
 
  
}
exports.postDeleteProfessor=(req,res)=>{
  const id = req.body.professorId;
  console.log(id)
  Professor.findById(id)
  .then((professor)=>{
    professor.deleted = 1
    professor.save()
    res.redirect('/all-professor')
    console.log("deleted")
  })
  
  
  }

  exports.getEditProfessor=(req,res)=>{
    const id= req.body.professorId;
    console.log(id)
     Professor.findById(id)
     .then(professor => {
      res.render('admin/add-professor',{
        editing:true,
        professor:professor,
        title:"Edit Professor",
        isAuthenticated:req.session.isLoggedIn
      })
     })
    .catch(err =>{
      console.log(err);
    })
  }  
  exports.postEditProfessor=(req,res)=>{
    const id = req.body.professorId
    const firstName = req.body.name;
    const address= req.body.add;
    const mobileno= req.body.mobileNum;
    const date=req.body.finish;
    const postcode  = req.body.postC;
    const department =req.body.department
    const description = req.body.description;
    const gender= req.body.gender;
    const email= req.body.email;
    const urlF= req.body.urlFace;
    const urlT=req.body.urlTwitter;
    const urlG  = req.body.urlGoogle;
    const image =req.file
    const imageUrl = (image)? image.path : req.body.currentImage
    console.log(imageUrl, id, email, gender, mobileno , date, department , firstName)
    Professor.findById(id)
    .then(professor=>{
      if(!professor){
        res.redirect('/all-professors');
      }
      professor.firstName = firstName;
      professor.address= address;
      professor.mobileno= mobileno;
      professor.date=date;
      professor.postcode  = postcode;
      professor.department =department
      professor.description = description;
      professor.gender= gender;
      professor.email= email;
      professor.urlF= urlF;
      professor.urlT=urlT;
      professor. urlG  = urlG;
      professor.imageUrl = imageUrl;
      professor.save()
      console.log('student Edited');
      res.redirect('/all-professor')
    })
    .catch(err=> console.log(err));



}  
exports.getProfileProfessor=(req,res)=>{
  const id = req.body.professorId;
  console.log(id)
  Professor.findById(id)
  .then((professor)=>{
    res.render('admin/professor-profile',{
      professor:professor,
      student:null,
      title:"Professor Profile",
      isAuthenticated:req.session.isLoggedIn
      
    })
    console.log(Professor.findById(id))
  })
  
  
  }