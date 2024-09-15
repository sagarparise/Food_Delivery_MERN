const jwt = require('jsonwebtoken');

const jwtToken = (userData)=>{

    const token = jwt.sign(userData, process.env.SECRET_KEY);
    console.log(token);
  return token;
}

module.exports = jwtToken;
