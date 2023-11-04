const express = require('express');
const routers=express.Router();
const TaxBrackets = require('../models/taxBrackets');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//route to create a tax bracket 
routers.post('/createTaxBracket',async(req,res)=>{
    console.log("createTaxBracket")
    try{
        const post=new TaxBrackets({
            
            bracket: req.body.bracket,
            percentage: req.body.percentage,
            genderRole: req.body.genderRole,
            Division: req.body.Division,
            District: req.body.District,
            CityCorporation: req.body.CityCorporation,
            LawReference: req.body.LawReference,
            Occupation: req.body.Occupation,
        });
        const savedPost=await post.save();
        res.json(savedPost);
    }
    catch(err){
        res.json({message:err});
    }
});

// admin login
routers.post('/login-admin',async(req,res)=>{
    try{
        //console.log(req.body);
        const user = {
            _id: process.env.ADMINID,
        } 
        if(res.body.id==user._id && req.body.password==process.env.ADMINPASSWORD){
            
                const token=jwt.sign({
                    id:user._id,
                    role:'admin'
                },process.env.TOKEN,
                {
                    expiresIn: '1h',
                    algorithm: 'HS256'
                });
                res.header('auth-token',token).send(token);
                return res.json({status:'ok' , user:token });//user is the payload 
            
            
        }
        else {
            return res.json({status:'error' , user:'error'}); //status is error and user is error means email id does not match
        }
    }
    catch(err){

    }
});

module.exports=routers;