const express = require("express");
const router = express.Router();
const { Users } = require("../models");

// GET for all users
router.get("/", async (req, res) => {
  const userData = await Users.findAll();
  res.json(userData);
});

// POST for password check
router.post("/", async (req, res) => {
  
  const user = await Users.findOne({where: {username: req.body.username}});

  if(user != null){

    if(user.password === req.body.password){
        res.json(user)
    }else{
        res.send({message: "Wrong password"})
    }
  }else{
    res.send({message: "User Does Not Exist"})
  }
 
});

module.exports = router;