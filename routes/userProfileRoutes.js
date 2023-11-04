
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const verify = require('../controllers/protectedRouting');


// Filling up user profile for update
router.get('/profile/:id',verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.put('/profile/:id',verify, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,       
    }, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
