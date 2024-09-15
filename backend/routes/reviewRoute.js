const express = require('express');
const { postReview, getReviews } = require('../controllers/reviewController');

const reviewRoute = express.Router();

reviewRoute.post('/addReview', postReview );

reviewRoute.get('/getReview', getReviews);

module.exports = reviewRoute;