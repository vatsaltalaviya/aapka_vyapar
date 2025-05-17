const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const db = require('./config/db');
const userRouter = require('./router/user.router');
const BusinessRouter = require('./router/business.router');
const cookieParser = require("cookie-parser");


app.use(cookieParser());
app.use(cors());

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/business', BusinessRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT)