const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const feedsRouts = require('./routes/feeds');

// const User = require("./models/user");

const port=3052;
const app = express();
const  MONGODB_URI = `mongodb+srv://youssef:2aX5MskBWS2czKG5@cluster0.xb63f.mongodb.net/Ecommerce?retryWrites=true&w=majority`;

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use((req, res, next) => {
//     User.findById('6068aab919527b347ccd09c5')
//       .then(user => {
//         req.user = user;
//         next();
//       })
//       .catch(err => console.log(err));
//   });

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });


app.use('/feeds',feedsRouts);


mongoose.connect('mongodb+srv://youssef:2aX5MskBWS2czKG5@cluster0.xb63f.mongodb.net/Ecommerce?retryWrites=true&w=majority', { useUnifiedTopology: true }, { 
    useNewUrlParser: true })
    .then(result=>{
        const server=app.listen(port);
        const io =require('./socket').init(server);
        io.on('connection',socket=>{
            console.log("client connected");
        });
    })
.catch(err=>{console.log(err);})