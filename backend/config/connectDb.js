const mongoose = require('mongoose');

const connectionDb = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('connected to db');
    
  } catch (error) {
    console.log(error.message);
  }

}

module.exports = connectionDb;