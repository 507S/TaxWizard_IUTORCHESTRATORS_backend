const express = require('express');
const routers=express.Router();
const Usermodel = require('../models/userModel')
const OTPModel = require('../models/otpCache');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

//logging in
routers.post('/login',async(req,res)=>{
    try{
        //console.log(req.body);
        const user = await Usermodel.findOne({
            email: req.body.email
        })
        if(user && user.verified == true){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const token=jwt.sign({
                    id:user._id,
                    name:user.name,
                    email:user.email
                },process.env.TOKEN,
                {
                    expiresIn: '1h',
                    algorithm: 'HS256'
                });
                res.header('auth-token',token).send(token);
                return res.json({status:'ok' , user:token , role: 'user'});//user is the payload 
            }
            else {
                return res.json({status:'ok' , user: 'error' ,role:'error'}); //staus is ok but user is error means email id matches but not the password
            }
        }
        else {
            return res.json({status:'error' , user:'error'}); //status is error and user is error means email id does not match
        }
    }
    catch(err){

    }
});


//signing up
routers.post('/signUp',async(req,res)=>{
    console.log(req.body);
    const post=new Usermodel({
        name: req.body.name,
        dob: null,
        email: req.body.mail,
        password: req.body.password,
        phone:null,
        verified: false,
        division: null,
        district: null,
        city: null,
        address: null,
    });
    try{
        console.log("here")
        Usermodel.findOne({email:req.body.mail})
        .then(data=>{
            console.log(data)
            if(data){
                res.json({message:"email already exists"});
            }
            else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        res.json({message:err});
                    }
                    else{
                        post.password=hash;
                    }
                    post.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.json({message: err});
                    });
                }); 
            }
        })
    }

    catch(e){
        console.log(e)
    }
    // post.save()
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     res.json({message: err});
    // });
    
});

// is logged in
routers.post('/isLoggedIn',async(req,res)=>{
    try{
        const token=req.body.token;
        if(token){
            const verified=jwt.verify(token,process.env.TOKEN);
            if(verified){
                const user=await Usermodel.findById(verified.id);
                if(user){
                    res.json({status:true , user:user.name , role: 'user'});
                }
                else{
                    res.json({status:false , user:'error'});
                }
            }
            else{
                res.json({status:'error' , user:'error'});
            }
        }
        else{
            res.json({status:'error' , user:'error'});
        }
    }
    catch(err){
        res.json({status:'error' , user:'error'});
    }

});

//get OTP for user
routers.post('/getOTP', async (req, res) => {
    const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
    try {
            const post = new OTPModel({
                otp: otp,
                date: new Date(),
                otpFor: req.body.email
            });
            console.log(post);
            await post.save()
                .then(data => {
                    res.json(data.otp);
                }).catch(err => {
                    console.log(err);
                });
    }
    catch (err) {
        res.json({ message: err });
    }
    //making a transporter to send otp to moderator
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'Tax Calculator Verification OTP',
        text: 'Your OTP is ' + otp + " " + "This OTP is valid for 1 day"
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
);

//verify OTP for moderator
routers.post('/verifyOTP', async (req, res) => {
    try {
        const otp = await OTPModel.findOne({ otp: req.body.otp });
        if (otp && otp.otpFor == req.body.email) {
            if (otp.date.getTime() + 8.64e+7 > new Date().getTime()) {
                res.json({ message: "OTP verified" });
                otp.remove();
                const validUser = await Usermodel.updateOne({email: req.body.email}, {$set: {verified: true}}) 
                // const mod = await ModeratorModel.findOne
                //     ({ email: req.mod.email });
                // mod.verified = true;
                // await mod.save();
            }
            else {
                res.json({ message: "OTP expired" });
            }
        }
        else {
            res.json({ message: "OTP not verified" });
        }
    }
    catch (err) {
        console.log(err);
    }
}
);

// route to recover password by sending otp



module.exports=routers;
