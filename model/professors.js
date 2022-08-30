const mongoose=require('mongoose');



const professorSchema= mongoose.Schema({
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
    deleted:{
        type:Number,
        default:0
    }

}, {timestamps:true})
const Professors= mongoose.model("professor",professorSchema);

module.exports = Professors;