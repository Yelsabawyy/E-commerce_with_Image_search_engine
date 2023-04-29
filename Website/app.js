const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
const port = 3050;

var path = require('path');
const shopRoutes = require('./Routers/shopRoutes');
const adminRoutes = require('./Routers/adminRoutes');
const authRoutes = require('./Routers/authRoutes');

const openSocket= require('socket.io-client');

app.set('view engine','ejs');
app.set('views','views');

app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

const socket = openSocket('http://localhost:3052');
socket.on('message',data=>{if (data.action==='send message'){
        localStorage.setItem('unseenMessages', data.unseenMessages.length);
        
    }
});
socket.on('cart',data=>{if (data.action==='send cart price'){
  localStorage.setItem('totalPrice', data.totalPrice);
  localStorage.setItem('cartQuantity', data.cartQuantity);
}
});

socket.on('placedOrder',data=>{if (data.action==='placed order'){
  localStorage.setItem('placedOrder', data.orders);
}
});


app.use('/',shopRoutes );
app.use('/admin',adminRoutes);
app.use('/auth',authRoutes);
app.get('*', function(req, res){
    res.status(404).render('../views/shop/404page');
  });

  

app.listen(port);

