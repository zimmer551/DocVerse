const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

// dotenv config
dotenv.config();

// Mongodb connection
connectDb();

// rest Object.
const app = express();

// middleware
app.use(cors(
    {
        origin: ["https://doc-verse-client.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json()); // so that we can pass json in request body
app.use(morgan('dev'));

// route
/* 304 status -> browser using cached response, since request resourse in not modified.*/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.get('/', (req, res) => {
    res.status(200).send({message:"server running"})
})

app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes')); 

const port = process.env.PORT || 8080;
// listen
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_MODE} mode on port ${port}`.blue)
})