const mongoose=require('mongoose');


const Schema= mongoose.Schema
const studentSchema= new Schema({
    firstName:{
      type:String,
     allowNull:false,

    },
    address:{
      type:String,
     allowNull:false,

    },
    mobileno:{
      type:Number,
     allowNull:false,

    },
    date:{
      type:String,
     allowNull:false,

    },
    postcode:{
      type:String,
      allowNull:false,
    },
    imageUrl:{
     type:String,
     allowNull:false,

    },
    department:{
     type:String,
     allowNull:false,
    },
    description:{
      type:String,
      allowNull:false,
    },
    gender:{
      type:String,
     allowNull:false,

    },
    email:{
      type:String,
      allowNull:false,
    },
    urlF:{
      type:String,
     allowNull:false,

    },
    urlT:{
      type:String,
     allowNull:false,

    },
    urlG:{
      type:String,
     allowNull:false,

    },
    courseId :{
      type:Schema.Types.ObjectId,
      ref:"course",
    },
    deleted:{
      type:Number,
      default:0
  }

}, {timestamps:true})
const Student= mongoose.model("student",studentSchema);

module.exports = Student;