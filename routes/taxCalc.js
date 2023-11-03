const express = require('express');
const routers=express.Router();
const Usermodel = require('../models/userModel')
const Taxmodel = require('../models/taxModel')
const bcrypt = require('bcryptjs');

routers.post('/taxCalc', async (req, res) => {
    try{
        user = await Usermodel.findOne({
            email: req.body.email
        })
        totalIncome = req.body.totalIncome;
        



    }
    catch(err){

    }
});

