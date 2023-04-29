const Message = require('../models/messages');

const io =require('../socket');
// send Message
exports.sendMessage = (req, res, next) => {

    const name=req.body.name;
    const email=req.body.email;
    const enquiry=req.body.message;
    const companyName=req.body.companyName;
    const country=req.body.country;
    const phone=req.body.phone;


    const message =new Message({
      name:name,
      phone:phone,
      companyName:companyName,
      country:country,
      email:email,
      message:enquiry,
      seen: false
    });

    message.save()
    .then(result=>{
      Message.aggregate([{ $match: { 'seen': false } }]).then(messages => {
        return messages
      
      }).then(messages=>{
        io.getIO().emit('message', {action :'send message' ,unseenMessages:messages});
        res.status(200).json({
            message: 'Delivered successfully.',
          });
      });
      })
    .catch(err=>{console.log(err);});
  
};


// fetch unseen Message
exports.fetchMessage = (req, res, next) => {
  
  Message.aggregate([{ $match: { 'seen': false } }]).then(messages => {
    res.status(200).json({
        message: 'The messages is Fetched successfully.',
        messages: messages,
      });
  }); 

  Message.updateMany({seen:true},function (err) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated messages");
      }
  });
  
  
  
};


exports.fetchAllMessage = (req, res, next) => {
  
  Message.find().then(messages => {
    res.status(200).json({
        message: 'The messages is Fetched successfully.',
        messages: messages,
      });
  }); 

  
};