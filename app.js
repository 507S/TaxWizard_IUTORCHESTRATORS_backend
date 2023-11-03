const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
//const fileUpload = require('express-fileupload');
//middlewares
app.use(cors());
app.use(express.json());

// const spell = require('spell-checker-js')
const port = 5001;

mongoose.set('strictQuery', true);

app.get('/', (req, res) => {
    res.send('Hello, World!').status(200);
  });   

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5001');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

//authentication module
const authRoutes = require('./routes/auth');
app.use('/auth',authRoutes);



const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(process.env.DB_CONNECTION,
    connectionParams,
)
.then(()=>console.log('DB connected'))
.catch(e=>console.log(e));

//how do we start listening to the server
app.listen(5001);
// create a get route to welcome
app.get('/',(req,res)=>{
    res.send('we are on home');
    res.status(200);
});
console.log('listening on port ', port);
module.exports=app;