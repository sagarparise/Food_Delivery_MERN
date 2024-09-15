const express = require('express');
const { signUp, signIn, signOut } = require('../controllers/authController');
const protected = require('../middlewares/protectedRoute');
const authRouter = express.Router();

authRouter.post('/signUp', signUp);
authRouter.post('/signIn', signIn);
authRouter.get('/signOut', signOut);

module.exports = authRouter;