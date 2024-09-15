const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protected = async(req, res, next) => {
  try {
    const token =req.headers["authorization"]
    console.log('token from protected route',token);
    if(!token)
    {
      return res.status(401).json({error: 'Token not found'});
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(!decoded){
      return res.status(401).json({error: 'Invalid Token'});
    }
    const user = await User.findById(decoded.id).select('-password');
    if(!user){
      return res.status(401).json({error: 'User not found'});
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    })
    
  }
};

module.exports = protected;