const express = require("express");
const routers = express.Router();
const Usermodel = require("../models/userModel");
const Taxmodel = require("../models/taxModel");
const TaxBrackets = require("../models/taxBrackets");
const FamilyRequest = require("../models/familyReq");
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

// send friend request
routers.post("/sendFriendRequest/:id", verify, async (req, res) => {
  console.log("sendFriendRequest");
  try {
    const user = await Usermodel.findById(req.params.id);
    if (user) {
      const friendRequest = {
        from_id: req.user._id,
        from_name: req.user.name,
        from_email: req.user.email,
        to_id: req.params.id,
        status:"pending"
      };
      // create a family request
      const familyRequest = new FamilyRequest(friendRequest);
      const savedRequest = await familyRequest.save();
      
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a user's friend requests
routers.get("/getFriendRequests", verify, async (req, res) => {
  console.log("getFriendRequests");
  try {
    const friendRequests = await FamilyRequest.find({to_id:req.user._id,status:"pending"});
    res.status(200).json(friendRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// accept a friend request

routers.post("/acceptFriendRequest/:id", verify, async (req, res) => {
  console.log("acceptFriendRequest");
  try {
    const friendRequest = await FamilyRequest.findById(req.params.id);
    if (friendRequest) {
      friendRequest.status = "accepted";
      const savedRequest = await friendRequest.save();
      const user = await Usermodel.findById(req.user._id);
      user.friends.push(friendRequest.from_id);
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } else {
      res.status(404).json({ message: "Friend request not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// reject a friend request

routers.post("/rejectFriendRequest/:id", verify, async (req, res) => {
  console.log("rejectFriendRequest");
  try {
    const friendRequest = await FamilyRequest.findById(req.params.id);
    if (friendRequest) {
      friendRequest.status = "rejected";
      const savedRequest = await friendRequest.save();
      const user = await Usermodel.findById(req.user._id);
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } else {
      res.status(404).json({ message: "Friend request not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a user's friends

routers.get("/getFriends", verify, async (req, res) => {
  console.log("getFriends");
  try {
    const user = await Usermodel.findById(req.user._id);
    if (user) {
      const friends = await Usermodel.find({ _id: { $in: user.friends } });
      res.status(200).json(friends);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = routers;