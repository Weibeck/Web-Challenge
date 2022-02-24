const express = require('express')
const router = express.Router();
const { Users } = require("../models")

router.post("/", async (req, res) => {
    const user = req.body;
    await Users.create(user);
    res.json(user)
});

module.exports = router;