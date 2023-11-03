const express = require('express');
const routers=express.Router();
const TaxBrackets = require('../models/taxBrackets');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//route to create a tax bracket 
routers.post('/createTaxBracket',async(req,res)=>{
    try{
        const post=new TaxBrackets({
            amountGreaterThen: req.body.amountGreaterThen,
            amountLessThen: req.body.amountLessThen,
            percentage: req.body.percentage,
            genderRole: req.body.genderRole,
            Division: req.body.Division,
            District: req.body.District,
            CityCorporation: req.body.CityCorporation,
            LawReference: req.body.LawReference,
        });
        const savedPost=await post.save();
        res.json(savedPost);
    }
    catch(err){
        res.json({message:err});
    }
});