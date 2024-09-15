const Review = require("../models/reviewModel");

const postReview = async (req, res) => {
  const{fullname, email, comment,rating, gender} = req.body;

  console.log('enter review')

  try {
    const review = await Review.findOne({email});
  if(review){
    return res.status(400).json({
      status: 400,
      message: "You have already posted a review"
    })
  }

  const photo = gender === 'male' 
  ? `https://avatar.iran.liara.run/public/boy?username=${fullname.replace(/\s+/g, '')}` 
  : `https://avatar.iran.liara.run/public/girl?username=${fullname.replace(/\s+/g, '')}`;

  const newReview = new Review({
    fullname,
    email,
    comment,
    rating,
    image: photo,
  })
 await newReview.save();
  res.status(201).json({
    status: 201,
    message: "Review posted successfully",
    review: newReview,
  })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }

}

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      status: 200,
      message: "fetched review successfully",
      reviews
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

module.exports = {postReview, getReviews}