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

module.exports=routers;