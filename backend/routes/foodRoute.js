const express = require('express');
const multer = require('multer');
const protected = require('../middlewares/protectedRoute')
const { addFood, getAllFood, deleteFood, addToCart, getCart, removeCartItem } = require('../controllers/foodController');

const foodRouter = express.Router();
// image storage Engine
const storage = multer.diskStorage({
  destination:"uploads",
  filename: function (req, file, cb) {
   return cb(null, `${Date.now()}${file.originalname}`)
  }
});

const upload = multer({ storage: storage });

foodRouter.post('/add',upload.single('image'), addFood)

foodRouter.get('/getAllFood', getAllFood);

foodRouter.delete('/deleteFood/:id', deleteFood);
// add to cart routes
foodRouter.post('/addToCart',protected, addToCart)
// get all food
foodRouter.get('/getCart',protected, getCart)

foodRouter.delete('/removeCartItem/:id',protected, removeCartItem)


module.exports = foodRouter;