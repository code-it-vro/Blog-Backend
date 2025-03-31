const jwt = require("jsonwebtoken");

module.exports = (req , res , next) => {
    const token = req.header("Authorization");

    // here we are simply trying to check if the token is present then we will return it by verifying it else we will return an error
    
    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message : "Unauthorized"});
    }
}