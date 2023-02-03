const { Schema, model } = require("mongoose");
const bcrypt =require('bcrypt')
const schema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },
  email:
  {
    type: String,
    required: [true, "email required"],
    trim: true,
  },
  password:{
    type:String,
    required: [true, "password required"],
    minlength: [6, "minlength 6 characters"],
  },
  phone:{
    type: String,
    required: [true, "phone required"],
    minlength: [11, "too short user phone"],
  },
  image: String,
  ratingAverage:{
    type:Number,
    min:1,
    max:5
  },
  rateCont:{
    type:Number,
    default:0,
  }
},{
    timestamps:true
});
schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
  next()
})
module.exports = model("driver", schema);
