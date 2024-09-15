const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectionDb = require('./config/connectDb');
const foodRouter = require('./routes/foodRoute');
const authRouter = require('./routes/authRoute');
const reviewRoute = require('./routes/reviewRoute');
const orderRouter = require('./routes/orderRoute');



const _dirname = path.resolve();

// middlewares 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes

app.use('/api/food', foodRouter);
app.use('/api/auth', authRouter);
app.use('/api/review', reviewRoute);
app.use('/api/order', orderRouter);
app.use('/images', express.static('uploads'))

app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
// server

app.listen(process.env.PORT, ()=>{
  connectionDb()
  console.log(`server is running on port ${process.env.PORT}`)
})

