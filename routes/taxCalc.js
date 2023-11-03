const express = require("express");
const routers = express.Router();
const Usermodel = require("../models/userModel");
const Taxmodel = require("../models/taxModel");
const TaxBrackets = require("../models/taxBrackets");
const bcrypt = require("bcryptjs");
const verify = require("../controllers/protectedRouting");

routers.post("/",verify, async (req, res) => {
  console.log("taxCalc");
  const brochure = {
    applicableBracketsID: [],
    applicableTaxPerBrackets: [],
    totalTax: 0,
    cityFee: 0,
    minimumTax: 3000,
  };
  userGivingTax = await Usermodel.findById(req.user._id);
  try {
    let totalIncome = parseFloat(req.body.totalIncome);
    // collect all tax bracktes from DB
    const taxBrackets = await TaxBrackets.find();
    //sort tax brackets by percentage ascending order
    taxBrackets.sort((a, b) => a.percentage - b.percentage);

   applicableBracketsID = []
   totalTax = 0
   richdude = false
   if(totalIncome>1650000) richdude = true
   if(totalIncome>350000 && userGivingTax.gender=='male'){
    totalIncome -= 350000;
    taxBrackets.forEach((taxBracket) => {
        if(totalIncome>0){
        tax= Math.min(taxBracket.bracket,totalIncome) * (taxBracket.percentage)/100;
        totalIncome -= taxBracket.bracket;
        totalTax += tax;
        applicableBracketsID.push(taxBracket._id);
        }
    })
    // impose 25% tax on the rest of the income
    totalTax += totalIncome * 25/100;
    
    //find the logged in user

    
    // if user's city corporation is Dhaka or Chattogram, then minimum 5000 taka tax
    if (userGivingTax.city == "Dhaka" || userGivingTax.city == "Chattogram") {
      totalTax = Math.max(totalTax, 5000);
    }
    // if user's city corporation is not Dhaka or Chattogram but something else, then minimum 4000 taka tax
    else if(userGivingTax.CityCorporation != null){
      totalTax = Math.max(totalTax, 4000);
    }
    else {
        totalTax = Math.max(totalTax, 3000);
    }

    


   }
   // check if the user is older then 65 years
    else if((new Date().getFullYear() - new Date(userGivingTax.dob).getFullYear() > 65 || userGivingTax.gender=='female') && totalIncome>400000){
        
        totalIncome -= 400000;
    taxBrackets.forEach((taxBracket) => {
        if(totalIncome>0){
        tax= Math.min(taxBracket.bracket,totalIncome) * (taxBracket.percentage)/100;
        totalIncome -= taxBracket.bracket;
        totalTax += tax;
        applicableBracketsID.push(taxBracket._id);
        
        }
    })
    // impose 25% tax on the rest of the income
    totalTax += totalIncome * 25/100;
    
    //find the logged in user

    
    // if user's city corporation is Dhaka or Chattogram, then minimum 5000 taka tax
    if (userGivingTax.city == "Dhaka" || userGivingTax.city == "Chattogram") {
      totalTax = Math.max(totalTax, 5000);
    }
    // if user's city corporation is not Dhaka or Chattogram but something else, then minimum 4000 taka tax
    else if(userGivingTax.CityCorporation != null){
      totalTax = Math.max(totalTax, 4000);
    }
    else {
        totalTax = Math.max(totalTax, 3000);
    }

    }

  

    res.json({ totalTax: totalTax });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routers;
