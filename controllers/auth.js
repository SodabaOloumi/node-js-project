const User =require("../model/user")

const bcrypt =require("bcryptjs")
exports.getLogin=(req,res)=>{
    console.log(req.session)
    res.render('admin/login',{
        isAuthenticated:false,
        title:"Login"
    });

    
}
exports.postLogin =(req,res)=>{
    const email= req.body.username;
    const password = req.body.password

    User.findOne({email:email})
    .then(userDoc =>{
        if(!userDoc){
          return res.redirect("/")
        }

        bcrypt.compare(password,userDoc.password)
        .then(doMatch=>{
            if(doMatch){
                req.session.isLoggedIn = true
                req.session.user = userDoc
                return req.session.save(err=>{
                    console.log(err)
                    res.redirect("/all-students")
                })
                

            }
            res.redirect("/")
        })
        .catch(err =>{
            console.log(err);
          })
    })
   
}
exports.postLogout =(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
}

exports.getSignup=(req,res)=>{
    console.log(req.session)
    res.render('admin/register',{
        isAuthenticated:false,
        title:"Register"
    });

    
}

exports.addUser = (req,res)=>{
    const fullName = req.body.name;
    const email= req.body.username;
    const password= req.body.password;
    const confirmPassword=req.body.confirmPassword;

    User.findOne({email:email})
    .then((userDoc)=>{
       if(userDoc){
        return  res.redirect("/signup")
       }

     return  bcrypt.hash(password,12)
       .then(hashPassword =>{
        const user= new User({
            fullName:fullName,
            email:email,
            password:hashPassword,  
        });
          return  user.save()
        }) 
        .then(()=>{
            console.log('USER added');
            res.redirect("/")
           
          })
       })
       
     
    .catch(err =>{
      console.log(err);
    })
  
  }