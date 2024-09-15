const fs = require('fs');
const Food = require('../models/foodModel');
const Cart = require('../models/cartModel');

const addFood = async(req,res)=>{
  let image_filename = `${req.file.filename}`;
 
  const{ name, price, description, rating, category,type } = req.body;

  console.log(req.body)

  
   if(!name || !price || !description || !rating || !category || !type || !image_filename){
      res.status(400).json({
        status: 400,
         message:"All fields are required"
      })
    }


 try {
  const food = new Food({
    name,
    price,
    description,
    image:image_filename,
    category,
    type,
    rating
  })

  await food.save();
   res.status(201).json({
    status: 201,
     message:"Food added successfully",
   })
  
 } catch (error) {
   res.status(500).json({
    status: 500,
     message:"Internal Server Error"
   })
  
 }

}

const getAllFood = async(req, res) => {
  try {
    const food = await Food.find();
    res.status(200).json({
      status: 200,
      message: "Food fetched successfully",
      food
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

const deleteFood = async(req, res) => {
  const id = req.params.id;
  try {
    const food = await Food.findByIdAndDelete(id);


    if(!food){
      res.status(404).json({
        status: 404,
        message: "Food not found"
      })
    }


    fs.unlink(`uploads/${food.image}`, (err)=>{
      if(err){
        console.log(err.message);
        return;
      }
      console.log('file deleted')
     
    })

    res.status(200).json({
      status: 200,
      message: "Food deleted successfully",
     
    })

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
  }
}

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const currentUser = req.user;
  

  try {
    let cart = await Cart.findOne({ user: currentUser._id });

    if (!cart) {
      cart = new Cart({ user: currentUser._id, items: [] });
    }

    const productIndex = cart.items.findIndex(item => item.food.toString() === productId);

   

    if (productIndex > -1) {
      // Product exists in the cart, update the quantity
      cart.items[productIndex].quantity = quantity;
    } else {
      // Product does not exist in cart, add a new item
      cart.items.push({ food: productId, quantity });
    }

    await cart.save();

    res.status(200).send({
      message: 'Product added to cart',
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
}

const getCart = async (req, res) => {
  const currentUser = req.user;
  try {
    const cart = await Cart.findOne({ user: currentUser._id }).populate('items.food');

  

    res.status(200).json({
      status: 200,
      message: "Cart fetched successfully",
      cart: cart ? cart : []
    });
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
    
  }
}

const removeCartItem = async (req, res) => {
  const currentUser = req.user;
  try {
    const cart = await Cart.findOne({ user: currentUser._id });
    const itemIndex = cart.items.findIndex(item => item.food.toString() === req.params.id);
    cart.items.splice(itemIndex, 1);
    
    await cart.save();

    res.status(200).json({
      status: 200,
      message: "Item removed from cart",
      cart
    });
  }
  catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
}

module.exports = {
  addFood,
  getAllFood,
  deleteFood,
  addToCart,
  getCart,
  removeCartItem
}