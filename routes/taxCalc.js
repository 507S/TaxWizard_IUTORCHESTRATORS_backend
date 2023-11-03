const express = require("express");
const routers = express.Router();
const Usermodel = require("../models/userModel");
const Taxmodel = require("../models/taxModel");
const TaxBrackets = require("../models/taxBrackets");
const bcrypt = require("bcryptjs");

routers.post("/", async (req, res) => {
  console.log("taxCalc");
  try {
    const totalIncome = parseFloat(req.body.totalIncome);
    // collect all tax bracktes from DB
    const taxBrackets = await TaxBrackets.find();
    //sort tax brackets by percentage ascending order
    taxBrackets.sort((a, b) => a.percentage - b.percentage);

   totalTax = 0
   taxBrackets.forEach((taxBracket) => {
    if(totalIncome>=taxBracket.lowPoint ){
        tax = (totalIncome - taxBracket.lowPoint) * (taxBracket.percentage)/100;
        totalTax += tax;
        console.log("taxed amount " + (totalIncome - taxBracket.lowPoint));
        console.log("percentage " + taxBracket.percentage);
        console.log("tax " + tax);
    }

   });

    res.json({ totalTax: totalTax });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routers;
