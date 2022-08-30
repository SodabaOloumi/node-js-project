
const express = require('express');
const app = express();
const path = require('path')
const session = require("express-session")
// const mpngodbStore = require("connect-mongodb-session")
const adminRouter = require ('./routes/admin');
const clientRouter =require('./routes/client');
const authRouter = require("./routes/auth")
const bodyParser = require('body-parser');
const rootDir = require('./util/path');
const mongoose=require('mongoose');
const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
        
    }
    
})


app.set('view engine','ejs');
app.set('views','views');

app.use(session({
    secret:"topSecurety",
    resave:false,
    saveUninitialized:false

}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({storage:fileStorage}).single("studentImage"))
app.use(express.static(path.join(rootDir, 'public')));
app.use("/images",express.static(path.join(rootDir, 'images')));

app.use(adminRouter);
app.use(clientRouter);
app.use(authRouter);


mongoose.connect( "mongodb://localhost:27017/class")
.then(()=>{
    console.log('mongodb')
    app.listen(3000);
})   
  
  
