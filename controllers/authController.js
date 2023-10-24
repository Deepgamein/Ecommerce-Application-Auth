const {User} = require('../models')

const {hashpassword, comparepassword} = require('../helper/authHelper')
const jwt = require('jsonwebtoken');
const { useInflection } = require('sequelize');
const user = require('../models/user');

const registerController = async (req, res)=>{
    console.log(req.body)
    try {
        const {name, email, password, phone, address} = req.body
        if(!name){
            return res.send({error:"Name is required"})
        }
        if(!email){
            return res.send({error:"Email is required"})
        }
        if(!password){
            return res.send({error:"Password is required"})
        }
        if(!phone){
            return res.send({error:"Phone is required"})
        }
        if(!address){
            return res.send({error:"Address is required"})
        }


        const existinguser = await User.findOne({
            where:{
                email
            },
         });

        if(existinguser) {
            return res.status(200).send({
                success:true,
                message:'User already exits Please Login',
            });
        }
        console.log(password, "-------")

        const hashedpassword = await hashpassword(password);
        console.log(hashpassword, "---test")

        const user = await User.create({
            name,
            email,
            phone,
            address,
            password: hashedpassword,
        });

        res.status(201).send({
            success:true,
            message:"user registered successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }
}


// Login

const loginController = async (req,res) =>{
    console.log("ok")
    try {
        const {email,password} =req.body
        console.log(email,password,"----")
        if(!email || !password) {
            return res.status(404).send({
                success:false,
                message:"Invalid password or email"
            })
        }
        const user = await User.findOne({where:{email}})
        if(!user) {
            return res.status(404).send({
                success:false,
                message:"Email not registered"
            })
        }
        const  match = await comparepassword(password,user.password)
        if(!match) {
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = await jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:"1h",})
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role,
            },
            token,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login"
        })

    }
}


const testController =(req, res) =>{
    res.send("Protected Routes");
}




module.exports = {registerController, loginController, testController};