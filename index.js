
const express = require('express');
const mongoose = require('mongoose');
const productRouter =require('./routes/products');
const doctorRouter = require('./routes/doctor');
const cors = require('cors'); 
require('dotenv').config({ path: '.env.local' });
const userRoutes = require('./routes/users')
const authRouter = require('./routes/auth')
const getDocDetails = require('./routes/getDocDetails')


const   bodyparser = require('body-parser');
const server = express();
const port  = 4000;

// Database
const {usernameDB,password} = process.env;
//console.log("hello",usernameDB,password);
const connectionMongoDB  = `mongodb+srv://${usernameDB}:${password}@cluster0.2pm78og.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(connectionMongoDB, {
    //serverSelectionTimeoutMS: 5000
    useNewUrlParser: true,useUnifiedTopology: true
  }).then(() => console.log("database connected")).catch(err => console.log(err.reason));
  
//middleware
server.use(bodyparser.urlencoded({extended:false}));
server.use(express.json());
server.use(express.static('public'));

server.use(cors());


server.use('/api',doctorRouter.router);
server.use('/api/products',productRouter.router);

server.use('/api/users',userRoutes);
server.use('/api/auth',authRouter);
server.use('/api/createDoctor',getDocDetails)

// api


server.listen(port,()=>{
    console.log('server is running on port' + port)
})