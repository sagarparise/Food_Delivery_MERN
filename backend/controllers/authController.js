const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwtToken = require("../utils/generateTkn");
const validator = require('validator')
const signUp = async(req, res)=>{
  const {fullname, email, password, phoneNumber} = req.body;

  if(!fullname || !email || !password || !phoneNumber )
  {
    return res.status(400).json({
      status: 400,
      message: "Please fill all the fields"
    })
  }

  try {

    const user = await User.findOne({email})
    if(user){
      return res.status(400).json({
        status: 400,
        message: "User already exists"
      })
    }

    // validating email
    if(!validator.isEmail(email)){
      return res.status(400).json({
        status: 400,
        message: "Invalid email"
      })
    }
    console.log(password.length)
    
    if(password.length < 6){
      return res.status(400).json({
        status: 400,
        message: "Password must be at least 6 characters"
      })
    }

    // password hashing algorithm

    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));

    const newUser = User({
      fullname,
      email,
      password:  hashPassword,
      phoneNumber,
      role: "user"
    })

    // create token  for user
    const token = jwtToken({id: newUser.id, email: newUser.email})

  await newUser.save();

    res.status(201).json({
      status: 201,
      message: "User created successfully",
      token,
      user:{
        fullname: newUser.fullname,
        email: newUser.email,
        phoneNumber: newUser.phonePhone,
        role: newUser.role
      }
    })
    
  } catch (error) {

    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
     
    })
    
  }
 

}

const signIn = async(req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({
      status: 400,
      message: "Please fill all the fields"
    })
  }

  try {
    const user = await User.findOne({email})

    const isPasswordMatch = await bcrypt.compare(password, user?.password || "");
    console.log(isPasswordMatch);
    if(!user || !isPasswordMatch) {
      return res.status(400).json({
        status: 400,
        message: "User invalid or password"
      })
    }
    const token = jwtToken({id: user.id, email: user.email});

    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      token,
      user:{
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phonePhone,
        role: user.role
      }
    })

    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
     
    })
    
  }

}

const signOut = (req, res) => {
  req.user = null;
  res.status(200).json({
    status: 200,
    message: "User logged out successfully"
  })
}


module.exports = {
  signUp,
  signIn,
  signOut
}