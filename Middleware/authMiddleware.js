const jwt = require("jsonwebtoken");
const {User} = require("../models")



const requireSignin = async (req, res, next) => {
    console.log( req.headers.authorization,"---------")
    try {
        const decode = await jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode
        console.log("Success")
        next();
    } catch (error) {
        console.log(error)
        // res.status(200).send({
        //     success:false,
        //     message:"Error"
        // })
    }
}



const isAdmin = async (req,res,next) =>{

    try {
        const user= await User.findByPk(req.user.id);
        if(user.role !=1){

            return res.status(401).send({
                success:false,
                message: "UnAuthorized Access"
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message:"Error in Admin middleware"
        })
        
    }
}

module.exports = {requireSignin, isAdmin}