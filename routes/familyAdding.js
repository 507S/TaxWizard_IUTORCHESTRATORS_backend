const express = require("express");
const routers = express.Router();
const Usermodel = require("../models/userModel");
const Taxmodel = require("../models/taxModel");
const TaxBrackets = require("../models/taxBrackets");
const bcrypt = require("bcryptjs");
const verify = require("../controllers/protectedRouting");


// search user by name
routers.get("/search/:name", verify, async (req, res) => {
  console.log("search");
  try {
    const user = await Usermodel.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = routers;