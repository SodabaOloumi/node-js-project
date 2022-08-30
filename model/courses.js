const mongoose=require('mongoose');


const Schema= mongoose.Schema
const coursesSchema= new Schema({
    courseName:{
      type:String,
     allowNull:false,

    },
    courseStartDate:{
      type:String,
     allowNull:false,

    },
    courseDuration:{
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
    professorId :{
        type:Schema.Types.ObjectId,
        ref:"professor",
      },
    
    year:{
      type:String,
      allowNull:false,

    },
    deleted:{
        type:Number,
        default:0
    }

}, {timestamps:true})
const Course= mongoose.model("course",coursesSchema);

module.exports = Course;