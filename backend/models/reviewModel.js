const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  fullname: {
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  image:{
    type:String,
    required:true
  },
  comment:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    required:true
  }
});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;