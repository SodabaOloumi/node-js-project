const mongoose=require('mongoose');


const Schema= mongoose.Schema
const userSchema= new Schema({
    fullName:{
      type:String,
     allowNull:false,

    },
    email:{
        type:String,
       allowNull:false,
  
      },
    password:{
        type:String,
        allowNull:false,
  
      },
   
    
    deleted:{
        type:Number,
        default:0
    }

}, {timestamps:true})
const User= mongoose.model("user",userSchema);

module.exports = User;