const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.body.token;
  console.log("token");
  
  if(token===undefined){
    token = req.params.token;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'supersecretesupersuper');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {

     res.status(422).json({
        message: "Not authenticated.",
        token:token
      });
  }
  req.userId = decodedToken.id;
  req.userEmail = decodedToken.email;
  next();
};
