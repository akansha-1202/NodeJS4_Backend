const jwt = require("jsonwebtoken");
const secretkey = process.env.SECRETKEY


function verifyToken(token){
   try{
      const tokenData = jwt.verify(token, secretkey);
      return tokenData;
   }catch (err){
      console.log(err);
      return null;
   }
}

function authorization(req, res, next) {
   const token = req.headers['authorization'];
   console.log(token);
   const userData = verifyToken(token);
   //checking if userData is null, meaning token was invalid
   if (userData == null) {
      return res.status(400).send("token is incorrect");
   }
   next();
}


// const authorization = (req,res,next)=>{
//      const bearerToken = req.headers["authorization"] //token from client side or which is stored in the localstorage
//      if(bearerToken === undefined){
//         return res.send({msg : "User is not authorised."})
//      }

//      const token = bearerToken.split(" ")[1];
//      console.log(bearerToken);
//      jwt.verify(token,secretkey)
//      if(!token){
//         return res.status(401).send({msg : "unauthorized person"})
//      }
//      next();
// }

module.exports = authorization;


//authorization  means veryfing users