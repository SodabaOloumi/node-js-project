const mongoose=require('mongoose');


const Schema= mongoose.Schema
const lessonSchema= new Schema({
    lessonName:{
      type:String,
     allowNull:false,

    },
    description:{
        type:String,
        allowNull:false,
      },
      imageUrl:{
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

},{timestamps:true})
const Lesson= mongoose.model("lesson",lessonSchema);

module.exports = Lesson;